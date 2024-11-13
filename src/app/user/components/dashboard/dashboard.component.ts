import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../../../admin/components/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  users : User[]; 
  email = { to: '', subject: '', text: '' };
  emailModalOpen = false;  
  constructor(
    private httpClient: HttpClient,
   
    
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }
 
  getUsers() {
    this.httpClient.get<User[]>('http://localhost:8080/agents').subscribe(
      response => {
        console.log('Fetched users:', response);
        this.users = response;  // Update the users list
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
}



