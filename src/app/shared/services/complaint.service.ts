import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Complaint} from '../model/complaint.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environement';
import {User} from '../model/user.types';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends GenericService<Complaint, number> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}${environment.complaints}`);

  }

  findAll(status: string) {
    const statusBody = status;
    return this.http.get<Complaint[]>(`${environment.apiUrl}${environment.complaints}${statusBody}`);
  }

  addComplaint(complaint: Complaint) {
    return this.http.post(`${environment.apiUrl}${environment.complaints}add-complaint`, complaint);
  }

  manageComplaint(complaint: Complaint) {
    return this.http.patch<Complaint>(`${environment.apiUrl}${environment.complaints}manage-complaint`, complaint);
  }

}
