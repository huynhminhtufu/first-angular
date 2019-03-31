import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClassroomComponent } from "./classroom/classroom.component";

const routes: Routes = [
  {
    path: "*",
    component: ClassroomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
