import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAgentComponent } from './add-agent/add-agent.component';



const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addAgent', component: AddAgentComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
