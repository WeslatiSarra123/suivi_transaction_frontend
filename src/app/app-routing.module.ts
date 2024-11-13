import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent }, 
  { path: 'Profile', component: ProfileComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent }, 
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }, 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) },
  { path: 'chatBoot', loadChildren: () => import('./chat-boot/chat-boot.module').then(m => m.ChatBootModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
