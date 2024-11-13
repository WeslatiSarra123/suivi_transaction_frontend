import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionResultsComponent } from './transaction-results/transaction-results.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AgentComponent,
    DashboardComponent,
    TransactionResultsComponent,
    ProfileComponent,
   
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ]
})
export class AgentModule { }
