import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AddCommentComponent} from './add-comment/add-comment.component';
import {ComplaintFormComponent} from './complaint-form/complaint-form.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-comment', component: AddCommentComponent},
  {path: 'add-complaint', component: ComplaintFormComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
