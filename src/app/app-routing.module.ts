import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { HomeComponent } from './layouts/home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { FeedbackComponent } from './layouts/feedback/feedback.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ADMIN, USER} from './shared/constants/app-constants';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'user', loadChildren: () => import('./layouts/user/user.module').then(m => m.UserModule) ,
    canActivate: [AuthGuard],
    data: {
      role: [ADMIN, USER]
    },
  },
  { path: 'admin', loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule) },
  { path: 'agent', loadChildren: () => import('./layouts/agent/agent.module').then(m => m.AgentModule) },
  { path: 'chatBoot', loadChildren: () => import('./layouts/chat-boot/chat-boot.module').then(m => m.ChatBootModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
