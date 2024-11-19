import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserStorageService} from '../services/user-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor() {
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
    if (token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`).set('Ignore-Cert-Error', 'true')
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error: any) => {
        console.log(error);

        return throwError(error);
      })
    );
  }
}
