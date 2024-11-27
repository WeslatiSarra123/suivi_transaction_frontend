import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserStorageService} from '../services/user-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private userStorageService:UserStorageService,
              private router:Router,
              private snackBar:MatSnackBar) {
  }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();
    const token = UserStorageService.getToken();
    req.headers.set('Content-Type', 'application/json')
    if (token && !req.url.includes('api/v1/auth')) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error: any) => {
        if (error.status === 403 && error.message.includes('JWT expired')) {
          this.userStorageService.signOut();
          this.snackBar.open(error?.error?.message, 'ERROR', {duration: 5000});
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
