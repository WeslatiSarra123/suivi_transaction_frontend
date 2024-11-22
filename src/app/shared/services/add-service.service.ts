import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environment/environement';

const BASIC_URL = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  constructor(private http : HttpClient) { }
  registerAgent ( addRequest:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}${environment.users}sign-upAgent`, addRequest);
 }
 //updateAgent(id: number, user: UserTypes): Observable<void> {
  //return this.http.put(BASIC_URL+ "sign-upAgent"/${id}/edit`, user);
}

