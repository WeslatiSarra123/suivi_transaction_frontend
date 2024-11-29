import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AddAgentComponent} from './add-agent/add-agent.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommentsComponent} from './comments/comments.component';
import {DemoAngularMaterialModule} from '../../shared/services/DemoAngularMaterialModule';
import {MatCardAvatar} from '@angular/material/card';
import {AgentModule} from '../agent/agent.module';
import {ArchivesComponent} from './archives/archives.component';
import {ComplaintListComponent} from './complaint-list/complaint-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddAgentComponent,
    CommentsComponent,
    ArchivesComponent,
    ComplaintListComponent
  ],
    imports: [CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DemoAngularMaterialModule,
        NgbModule,
        MatCardAvatar, AgentModule

    ],

  providers:
    [provideHttpClient(withInterceptorsFromDi())]
})
export class AdminModule {
}
