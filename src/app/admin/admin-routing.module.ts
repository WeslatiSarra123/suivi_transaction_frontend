import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddAgentComponent } from './components/add-agent/add-agent.component';



const routes: Routes = [
  {path: '', component: AdminComponent }, 
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addAgent', component: AddAgentComponent},
  
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
