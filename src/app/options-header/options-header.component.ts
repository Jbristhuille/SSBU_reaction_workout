/******************************************************************************/
/*  File: options-header.component.scss                                       */
/*  Date: 29/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Options header variables and functions                       */
/******************************************************************************/

/* SUMMARY
  * Angular
  * Services
*/

/* Angular */
import { Component, OnInit } from '@angular/core';
/***/

/* Services */
import { GamepadManagerService } from '../services/gamepadManager/gamepad-manager.service';
/***/

@Component({
  selector: 'app-options-header',
  templateUrl: './options-header.component.html',
  styleUrls: ['./options-header.component.scss']
})
export class OptionsHeaderComponent implements OnInit {
  constructor(public gm: GamepadManagerService) {
  }

  ngOnInit(): void {
  }
}
