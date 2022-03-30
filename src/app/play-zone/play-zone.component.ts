/******************************************************************************/
/*  File: play-zone.component.ts                                              */
/*  Date: 29/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Play zone variables and functions                            */
/******************************************************************************/

/* SUMMARY
  * Angular
  * Services
  * Name: launchGame
  * Name: saveStepResult
  * Name: startGameTimer
  * Name: inputStart
*/

/* Angular */
import { Component, OnInit } from '@angular/core';
/***/

/* Services */
import { GamepadManagerService } from '../services/gamepadManager/gamepad-manager.service';
/***/

/* Node modules */
import * as _ from "lodash";
/***/

@Component({
  selector: 'app-play-zone',
  templateUrl: './play-zone.component.html',
  styleUrls: ['./play-zone.component.scss']
})
export class PlayZoneComponent implements OnInit {
  public isPlaying: boolean = false;
  public timeBeforePlay: number = 3;

  public inputRet: any = null;
  public awaitedButton: any;
  public results: any[] = [];
  public endGame: any;

  public steps: number = 10;
  private maxTime: number = 3000;
  private minTime: number = 500;
  private timeout: number = 500;

  constructor(public gm: GamepadManagerService) {
  }

  ngOnInit(): void {
  }

  /*
  * Name: launchGame
  * Description: Start game
  */
  public async launchGame(): Promise<void> {
    this.isPlaying = true;
    this.results = [];
    this.endGame = null;
    await this.startGameTimer();

    for (var i = 0; i < this.steps; i++) { // Game loop
      let inputTiming = Math.random() * (this.maxTime - this.minTime) + this.minTime; // Define input timing
      let waitButton = this.gm.buttonList[Math.floor(Math.random() * this.gm.buttonList.length)]; // Get random button in list

      setTimeout(() => { // Print button to input
        this.awaitedButton = waitButton;
      }, inputTiming);

      let start = Date.now();
      this.inputRet = await this.inputStart(inputTiming, waitButton, this.timeout); // Start input action

      this.awaitedButton = null;
      this.saveStepResult(start);
    }

    this.computeResult();

    // Reset game
    this.isPlaying = false;
    this.timeBeforePlay = 3;
  }
  /***/

  /*
  * Name: saveStepResult
  * Description: Save step
  *
  * Args:
  * - startTime (Number): Step start
  */
  private saveStepResult(startTime: number): void {
    this.results.push({
      success: this.inputRet,
      time: (Date.now() - startTime) / 1000 // save in seconds
    });

    setTimeout(() => {
      this.inputRet = null;
    }, 200);
  }
  /***/

  /*
  * Name: computeResult
  * Description: Compute definive results
  */
  private computeResult(): void {
    let tmp = _.filter(this.results, (r) => {
      return r.success;
    });

    tmp = _.sortBy(tmp, (a: any) => {
      return a.time;
    });

    this.endGame = {
      success: tmp.length,
      fails: this.steps - tmp.length,
      best: tmp[0].time.toFixed(3),
      worse: tmp[tmp.length-1].time.toFixed(3),
      median: tmp[Math.floor(tmp.length/2)-1].time.toFixed(3),
      average: _.meanBy(tmp, (r) => r.time).toFixed(3)
    };
  }
  /***/

  /*
  * Name: startGameTimer
  * Description: Count time before play
  */
  private startGameTimer(): Promise<void> {
    return new Promise((resolve) => {
      let countdown = setInterval(() => {
        this.timeBeforePlay--;
        if (this.timeBeforePlay <= 0) {
          clearInterval(countdown);
          return resolve();
        }
      }, 1000);
    });
  }
  /***/

  /*
  * Name: inputStart
  * Description: Start input and wait response
  *
  * Args:
  * - start (Number): Time before start
  * - button (Object): Button waited
  * - timeout (Number): Timeout before fail
  *
  * Return (Promise): True = success, false = fail, trigger while player input or timeout
  */
  private inputStart(start: number, button: any, timeout: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.gm.isPressedTimeout(button, timeout)
          .then(() => {return resolve(true)})
          .catch(() => {return resolve(false)});
      }, start);
    });
  }
  /***/
}
