import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBootComponent } from './chat-boot.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';

const routes: Routes = [
  { path: '', component: ChatBootComponent },
  { path:'chat', component: ChatDialogComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatBootRoutingModule { }
