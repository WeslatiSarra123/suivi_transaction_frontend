import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/model/user.types';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  users: User[];
  email = {to: '', subject: '', text: ''};

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.httpClient.get<User[]>('http://localhost:8080/agents').subscribe({
      next: response => {
        console.log('Fetched users:', response);
        this.users = response;  // Update the users list
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

}



