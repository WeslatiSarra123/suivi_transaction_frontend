import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user.types';
import {UserService} from '../../../shared/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  agents: User[];
  email = {to: '', subject: '', text: ''};

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getAgents();
  }


  private getAgents() {

    this.userService.getAgents().subscribe(res => {
      this.agents = res
    })
  }
}



