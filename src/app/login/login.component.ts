import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup;
  hidePassword = true;
constructor(private formBuilder: FormBuilder,
  private snackeBar : MatSnackBar,
  private authService: AuthService,
  private router : Router){
}
ngOnInit(): void {
  this.loginForm= this.formBuilder.group({
  email:[null ,  [Validators.required]] ,
  password :[null , [Validators.required]],

})
}
togglePasswordVisibility(){
  this.hidePassword=!this.hidePassword
}
onSubmit():void{
  const username= this.loginForm.get('email')!.value;
  const password= this.loginForm.get('password')!.value;
  this.authService.login(username, password).subscribe(
    (response)=>{
   if(UserStorageService.isAdminLoggedIn()){
      this.router.navigateByUrl('admin/dashboard');
   } else if(UserStorageService.isUserLoggedIn()){
    this.router.navigateByUrl('user/dashboard');
   }else if(UserStorageService.isAgentLoggedIn()){
    this.router.navigateByUrl('agent/dashboard');
   }
    
    },
   (error)=>{
    this.snackeBar.open('Bad Credentials.', 'ERROR', {duration:5000});
   }

  )
}
}
