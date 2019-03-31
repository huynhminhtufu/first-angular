import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Lab11Component } from "./lab11/lab11.component";

const routes: Routes = [
  {
    path: "/lab11",
    component: Lab11Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
