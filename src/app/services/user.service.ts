import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.apiUrl}forgot-password`, email);
  }

  resetPassword(token: string, password: string) {
    const body = {
      token, password
    }
    return this.http.post(`${environment.apiUrl}reset-password`, body);
  }
}
