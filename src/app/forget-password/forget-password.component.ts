import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  

  constructor(private fb: FormBuilder, private http: HttpClient) {
    
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    const email = this.forgotPasswordForm.get('email')?.value;
    this.http.post('http://localhost:8080/api/forgot-password', { email })
      .subscribe({
        next: () => this.message = 'Reset email sent successfully.s',
        error: (err) => this.message = err.error.message
      });
  }
}