import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionResultsComponent } from './transaction-results/transaction-results.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'results', component: TransactionResultsComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
