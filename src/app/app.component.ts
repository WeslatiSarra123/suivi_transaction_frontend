import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SuiviTransactionOredoo';

  isUserLoggedIn : boolean= UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean= UserStorageService.isAdminLoggedIn();
  isAgentLoggedIn : boolean= UserStorageService.isAgentLoggedIn();
  constructor(private router :Router){}
  ngOnInit():void{
    this.router.events.subscribe( event=>{
      this.isUserLoggedIn=UserStorageService.isUserLoggedIn();
      this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
      this.isAgentLoggedIn=UserStorageService.isAgentLoggedIn();
    })
  }
  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
