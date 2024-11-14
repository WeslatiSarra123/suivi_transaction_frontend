import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    // Crée un formulaire pour saisir le nouveau mot de passe
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Envoie le nouveau mot de passe et le jeton au backend
  submit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const password = this.resetPasswordForm.get('password')?.value;
    this.http.post(`http://localhost:8080/api/reset-password?token=${token}`, { newPassword: password })
      .subscribe({
        next: () => this.message = 'Password successfully reset.',
        error: (err) => this.message = err.error.message
      });
  }
}