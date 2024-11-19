import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { AddAgentComponent } from './components/add-agent/add-agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({ declarations: [
        AdminComponent,
        DashboardComponent,
        AddAgentComponent,


    ],
    imports: [CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DemoAngularMaterialModule,
        NgbModule,

    ],

        providers:
        [provideHttpClient(withInterceptorsFromDi())] })
export class AdminModule { }
