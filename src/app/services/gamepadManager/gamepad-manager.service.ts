/******************************************************************************/
/*  File: gamepad-manager.service.ts                                          */
/*  Date: 28/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Manage gamepads, connection/disconnection, events, etc...    */
/******************************************************************************/

/* SUMMARY
  * Angular
  * Node modules
  * Name: init
  * Name: loop
  * Name: isPressed
  * Name: printPressed
*/

/* Angular */
import { Injectable } from '@angular/core';
/***/

/* Node modules */
import * as _ from 'lodash';
/***/

@Injectable({
  providedIn: 'root'
})
export class GamepadManagerService {
  public gamepads: any[] = [];
  public used: any = {};
  public currentState: any;

  public onRebind: boolean = false;
  public buttonList: any[] = [
    {name: 'shield', cmd: 7},
    {name: 'jump', cmd: 2},
    {name: 'grab', cmd: 5},
    {name: 'attack', cmd: 1},
    {name: 'special', cmd: 0}
  ];

  private checkTime: number = 10;

  constructor() {
    this.init();
  }

  /*
  * Name: init
  * Description: Initialize connection/disconnection events
  */
  private init() {
    window.addEventListener("gamepadconnected", (e) => {
      this.gamepads.push(e.gamepad);
      this.used = e.gamepad;
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      let i = this.gamepads.findIndex((gamepad) => {
        return gamepad.id == e.gamepad.id;
      });

      if (i != -1) this.gamepads.splice(i, 1);
    });

    this.loop();
  }
  /***/

  /*
  * Name: loop
  * Description: Check buttons input and update current gamepad state
  */
  private loop() {
    setInterval(() => {
      if (this.used) {
        let gpArr = navigator.getGamepads(); // Get gamepads array
        let gp = gpArr.find((g) => { // Find used gamepad
          if (g) return g.id == this.used.id;
          else return false;
        });

        if (gp) this.currentState = gp; // Get current gamepad state
      }
    }, this.checkTime);
  }
  /***/

  /*
  * Name: printPressed
  * Description: Print all pressed button
  *
  * Return (Array): All buttons pressed
  */
  public printPressed() {
    let ret: any[] = [];

    if (this.currentState && this.currentState.buttons) {
      for (let i = 0; i < this.currentState.buttons.length; i++) {
        console.log(this.currentState.buttons[i]); // DEBUG

        if (this.currentState.buttons[i] && this.currentState.buttons[i].pressed)
          ret.push(i);
      }
    }

    return ret;
  }
  /***/

  /*
  * Name: isPressed
  * Description: Check if button is pressed
  *
  * Return (Boolean): True if target button is pressed
  */
  public isPressed(button: any) {
    if (this.currentState && button)
      return this.currentState.buttons[button.cmd].pressed;
    else return false;
  }
  /***/
}
