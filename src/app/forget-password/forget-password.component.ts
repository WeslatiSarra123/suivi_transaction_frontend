import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password.service';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    const email = this.forgotPasswordForm.value.email;
    this.forgotPasswordService.forgotPassword(email).subscribe(
      response => this.message = `Reset link sent! Check your email at ${email}.`,
      error => this.message = 'Failed to send reset link. Check if the email is correct.'
    );
  }
}
