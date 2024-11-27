import {Injectable} from '@angular/core';
import {User} from '../model/user.types';
import {ADMIN, AGENT, TOKEN, USER} from '../constants/app-constants';


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: User): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): User {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): number {
    const user = this.getUser();
    if (user == null) {
      return null;
    }
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.userRole;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == ADMIN;
  }

  static isAgentLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == AGENT;
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == USER;
  }

   signOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }
}
