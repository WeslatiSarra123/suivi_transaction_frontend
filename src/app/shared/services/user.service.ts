import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {UserStorageService} from './user-storage.service';
import {environment} from '../../../environment/environement';
import {User} from '../model/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private userStorageService: UserStorageService) {
  }


  getProfile(userId: any): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.users}${userId}`);
  }

  updateProfile(userId: any, user: any): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}${environment.users}${userId}`, user).pipe(
      map((res: any) => {
        console.log(res)
        return res

      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    )
  }

  getUser(): Observable<boolean> {
    const token = UserStorageService.getToken();
    if (!token) {
      console.log("No token found");
      return of(false); // Si aucun token n'est trouvé, retourner false
    }

    return this.http.get<any>(`${environment.apiUrl}${environment.users}Me`).pipe(
      map((user: any) => {
        console.log(user);
        if (user?.id) {
          this.userStorageService.saveUser(user);
          return true; // Si l'utilisateur existe et a un `id`, retourner true
        }
        return false; // Sinon retourner false
      }),
      catchError((err) => {
        console.error('Get User error:', err);
        return of(false); // En cas d'erreur, retourner false
      })
    );
  }

  getAgents() {
  return   this.http.get<User[]>('http://localhost:8080/agents');
  }

}
