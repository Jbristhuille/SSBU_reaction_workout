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
  * Name: startGameTimer
  * Name: inputStart
*/

/* Angular */
import { Component, OnInit } from '@angular/core';
/***/

/* Services */
import { GamepadManagerService } from '../services/gamepadManager/gamepad-manager.service';
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

  private maxTime = 3000;
  private minTime = 500;
  private timeout = 500;

  constructor(public gm: GamepadManagerService) {
  }

  ngOnInit(): void {
  }

  /*
  * Name: launchGame
  * Description: Start game
  */
  public async launchGame() {
    this.isPlaying = true;
    await this.startGameTimer();

    for (var i = 0; i < 10; i++) { // Game loop
      let inputTiming = Math.random() * (this.maxTime - this.minTime) + this.minTime; // Define input timing
      let waitButton = this.gm.buttonList[Math.floor(Math.random() * this.gm.buttonList.length)]; // Get random button in list

      setTimeout(() => { // Print button to input
        this.awaitedButton = waitButton;
      }, inputTiming);

      this.inputRet = await this.inputStart(inputTiming, waitButton, this.timeout); // Start input action

      // Success/fail process (to do)
      this.awaitedButton = null;

      setTimeout(() => {
        this.inputRet = null;
      }, 200);
    }

    // Reset game
    this.isPlaying = false;
    this.timeBeforePlay = 3;
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
