/******************************************************************************/
/*  File: app.module.ts                                                       */
/*  Date: 28/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Main module                                                  */
/******************************************************************************/

/* SUMMARY
  * Angular
  * Components
*/

/* Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
/***/

/* Components */
import { AppComponent } from './app.component';
import { OptionsHeaderComponent } from './options-header/options-header.component';
import { PlayZoneComponent } from './play-zone/play-zone.component';
/***/

@NgModule({
  declarations: [
    AppComponent,
    OptionsHeaderComponent,
    PlayZoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
