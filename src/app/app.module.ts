import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoAngularMaterialModule} from './DemoAngularMaterialModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ChatDialogComponent } from './chat-boot/chat-dialog/chat-dialog.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        ForgetPasswordComponent,
        ProfileComponent,
        ResetPasswordComponent,
        NavbarComponent,
        
        
        
        
    ],
    bootstrap: [AppComponent], 
    
    imports: [BrowserModule,
        AppRoutingModule,
        DemoAngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
       
        
        
    ], 
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
