/******************************************************************************/
/*  File: app.component.ts                                                    */
/*  Date: 28/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Main component variables and functions                       */
/******************************************************************************/

/* SUMMARY
  * Angular
*/

/* Angular */
import { Component } from '@angular/core';
import { environment } from './../environments/environment';
/***/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version: string = environment.version;
}
