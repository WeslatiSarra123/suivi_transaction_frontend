import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit(): void {
    const password = this.resetPasswordForm.value.password;
    this.forgotPasswordService.resetPassword(this.token, password).subscribe(
      response => {
        this.message = 'Password successfully reset!';
        this.router.navigate(['/login']); // Redirect to login
      },
      error => this.message = 'Failed to reset password. Token might be invalid or expired.'
    );
  }
}
