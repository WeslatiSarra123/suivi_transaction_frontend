import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
   ReactiveFormsModule,
   
  ]
})
export class UserModule { }
