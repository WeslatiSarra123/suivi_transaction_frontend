import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {DemoAngularMaterialModule} from './shared/services/DemoAngularMaterialModule';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ProfileComponent} from './profile/profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthInterceptor} from './shared/interceptors/AuthInterceptor';
import {FileUploadComponent} from './profile/file-upload/file-upload.component';
import {NgOptimizedImage} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    ResetPasswordComponent,
    NavbarComponent,
    FileUploadComponent,


  ],
  bootstrap: [AppComponent],

  imports: [BrowserModule,
    AppRoutingModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule, NgOptimizedImage,


  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},

    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
}
