import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {DemoAngularMaterialModule} from '../shared/services/DemoAngularMaterialModule';
import {AddAgentComponent} from './add-agent/add-agent.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({ declarations: [
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
