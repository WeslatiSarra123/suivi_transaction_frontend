import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AgentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
