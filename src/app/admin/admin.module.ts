import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AddAgentComponent} from './add-agent/add-agent.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommentsComponent} from './comments/comments.component';
import {DemoAngularMaterialModule} from '../shared/services/DemoAngularMaterialModule';
import {MatCardAvatar} from '@angular/material/card';


@NgModule({
  declarations: [
    DashboardComponent,
    AddAgentComponent,
    CommentsComponent

  ],
  imports: [CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoAngularMaterialModule,
    NgbModule,
    MatCardAvatar

  ],

  providers:
    [provideHttpClient(withInterceptorsFromDi())]
})
export class AdminModule {
}
