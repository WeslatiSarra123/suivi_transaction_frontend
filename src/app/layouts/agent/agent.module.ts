import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionResultsComponent } from './transaction-results/transaction-results.component';


@NgModule({
    declarations: [
        DashboardComponent,
        TransactionResultsComponent,

    ],
    exports: [
        TransactionResultsComponent
    ],
    imports: [
        CommonModule,
        AgentRoutingModule,
        FormsModule,
        ReactiveFormsModule,

    ]
})
export class AgentModule { }
