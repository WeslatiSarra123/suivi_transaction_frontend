import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';


@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatLabel,

  ]
})
export class UserModule { }
