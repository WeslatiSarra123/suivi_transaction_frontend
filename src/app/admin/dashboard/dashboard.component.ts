import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../shared/model/user.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  editForm: FormGroup;


  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      password: [''],
      phoneNumber: ['']
    });
  }

  // Method to get the list of users (agents)
  getUsers() {
    this.httpClient.get<User[]>('http://localhost:8080/agents').subscribe({
      next: response => {
        console.log('Fetched users:', response);
        this.users = response;  // Update the users list
      },
      error: (error) => console.error('Error fetching users:', error)
    });
  }


  deleteAgent(id: number) {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.httpClient.delete(`http://localhost:8080/agents/${id}`).subscribe({
        next: () => {
          console.log('Agent deleted successfully.');
          this.getUsers();  // Rechargez la liste après suppression
        },
        error: (error) =>
          console.error('Error deleting agent:', error)
      });
    }
  }


  openEdit(targetModal, user: User) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,

    });
  }

  onSave() {
    const editURL = 'http://localhost:8080/agents/' + this.editForm.value.id + '/edit';
    this.httpClient.put(editURL, this.editForm.value).subscribe(() => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }


}










