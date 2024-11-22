import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AddCommentComponent} from './add-comment/add-comment.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-comment', component: AddCommentComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
