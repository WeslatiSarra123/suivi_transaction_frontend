import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {AddCommentComponent} from './add-comment/add-comment.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddCommentComponent,

  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCard,
        MatLabel,
        MatButton,
        MatCardContent,
        MatCardTitle,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatSuffix,

    ]
})
export class UserModule { }
