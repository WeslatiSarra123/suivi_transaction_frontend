import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddServiceService } from '../../services/add-service.service';


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.scss'
})
export class AddAgentComponent {
  addForm!:FormGroup;
  hidePassword = true;
   
  
  constructor(private fb: FormBuilder,
    private snackerBar : MatSnackBar,
    private addService: AddServiceService,
    private router : Router){
  
    }
  ngOnInit(): void {
    this.addForm= this.fb.group({
    name:[null , [Validators.required]],
    email:[null ,  [Validators.required ,Validators.email ]] ,
    phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    password :[null , [Validators.required]],
    confirmPassword:[null , [Validators.required]],
  })
  }
  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword
  }
  onSubmit():void{
    const password= this.addForm.get('password')?.value;
    const confirmPassword = this.addForm.get('confirmPassword')?.value;
    if(password !== confirmPassword){
      this.snackerBar.open('Passwords do not match .' , 'Close', { duration:5000 , panelClass:'error-snackbar'});
      return;
    }
    this.addService.registerAgent(this.addForm.value).subscribe(
      (response)=>{
      this.snackerBar.open('Sign up successful', 'Close', {duration:5000});
      this.router.navigateByUrl("admin/dashboard");
      },
     (error)=>{
      this.snackerBar.open('Sign up failed , Please try again.', 'Close', {duration:5000 , panelClass: 'error-snackbar'});
     }
  
    )
  }
  
  }
  
