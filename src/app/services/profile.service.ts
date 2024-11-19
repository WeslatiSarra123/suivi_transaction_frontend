import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/user.types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/profile'; // URL de votre API

  constructor(private http: HttpClient) { }

  getProfile(userId: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }
}

