import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap, of, catchError} from 'rxjs';
import {UserStorageService} from './user-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from './user.service';
import {environment} from '../../../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  decodedToken: any;

  constructor(private http: HttpClient,
              private _userService: UserService,
              private jwtHelper: JwtHelperService,
              private userStorageService: UserStorageService,
  ) {
  }


  register(signupRequest: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.auth}sign-up`, signupRequest);
  }

  login(username: string, password: string): Observable<boolean> {
    const body = { username, password };

    return this.http.post(`${environment.apiUrl}${environment.auth}login`, body).pipe(
      switchMap((res: any) => {
        const accessToken = res.token;
        if (accessToken) {
          this.userStorageService.saveToken(accessToken);
          this.decodedToken = this.jwtHelper.decodeToken(accessToken);
          if (this.jwtHelper.isTokenExpired(accessToken)) {
            console.warn("Token has expired");
            return of(false); // Si le token est expiré, on retourne false
          }
          // Retourner directement l'Observable retourné par `getUser()`
          return this._userService.getUser(); // getUser() retourne déjà un Observable<boolean>
        }
        return of(false); // Aucun token trouvé, retourner false
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false); // En cas d'erreur, retourner false
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.apiUrl}${environment.auth}forgot-password`, email);
  }

  resetPassword(token: string, password: string) {
    const body = {
      token, password
    }
    return this.http.post(`${environment.apiUrl}${environment.auth}reset-password`, body);
  }
}
