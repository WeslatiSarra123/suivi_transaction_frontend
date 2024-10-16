import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


export class User{
  constructor(
    public id:number,
    public name: string,
    public email: string,
    public password: string,
    public phoneNumber: string,

  ){

  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
 users : User[];
 closeResult:string;
 
  constructor(
   private httpClient:HttpClient,
   private modalService: NgbModal

  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.httpClient.get<any>('http://localhost:8080/agents').subscribe(
      response=>{
        console.log(response);
        this.users=response;
      }
    );
  }

  

  

  
}

