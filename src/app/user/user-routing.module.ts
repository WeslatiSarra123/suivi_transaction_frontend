import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'comment', component: CommentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
