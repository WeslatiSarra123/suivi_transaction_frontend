import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBootRoutingModule } from './chat-boot-routing.module';
import { ChatBootComponent } from './chat-boot.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatBootComponent,
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatBootRoutingModule
  ],
  providers:[
    ChatService
  ]
})
export class ChatBootModule { }
