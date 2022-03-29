/******************************************************************************/
/*  File: app-routing.module.ts                                               */
/*  Date: 28/03/2022                                                          */
/*  Author: Jbristhuille                                                      */
/*                                                                            */
/*  Description: Angular routing module                                       */
/******************************************************************************/

/* SUMMARY
  * Angular
  * Paths
*/

/* Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/***/

/* Paths */
const routes: Routes = [];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
