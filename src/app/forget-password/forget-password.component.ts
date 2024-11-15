import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  message: string = '';
  tokenSent = false;


  constructor(private fb: FormBuilder,
              private snackeBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.resetPasswordForm = this.fb.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const email: string = this.forgotPasswordForm.get('email')?.value;
    this.userService.forgotPassword(email).subscribe({
      next: () => {
        this.tokenSent = true;
        return this.snackeBar.open("Token generated successfully.", '', {duration: 5000});
      },
      error: (err) => {
        console.log(err)
        this.message = err?.error?.message
        return this.snackeBar.open(this.message, 'ERROR', {duration: 5000});

      }
    });
  }

  resetPassword() {
    const email: string = this.resetPasswordForm.get('email')?.value;
    this.userService.resetPassword(this.resetPasswordForm.get('token')?.value, this.resetPasswordForm.get('password')?.value).subscribe({
      next: () => {
        this.tokenSent = true;
        this.snackeBar.open("Password successfully reset.", '', {duration: 5000});
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err)
        this.message = err?.error?.message
        return this.snackeBar.open(this.message, 'ERROR', {duration: 5000});

      }
    });
  }

  protected readonly onReset = onreset;
}
