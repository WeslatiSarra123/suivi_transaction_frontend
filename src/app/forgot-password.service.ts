import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = 'http://localhost:8080'; // Base URL for backend

  constructor(private http: HttpClient) { }

  // Send email for forgot password
  forgotPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, {}, { params, responseType: 'text' });
  }

  // Reset password with token and new password
  resetPassword(token: string, password: string): Observable<string> {
    const params = new HttpParams().set('token', token).set('password', password);
    return this.http.put(`${this.apiUrl}/reset-password`, {}, { params, responseType: 'text' });
  }
}

