import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddAgentComponent} from './add-agent/add-agent.component';
import {CommentsComponent} from './comments/comments.component';
import {ComplaintListComponent} from './complaint-list/complaint-list.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addAgent', component: AddAgentComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'show-complaints', component: ComplaintListComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
