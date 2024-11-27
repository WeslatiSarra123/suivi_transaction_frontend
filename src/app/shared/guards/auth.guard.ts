import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {UserStorageService} from '../services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private userStorageService: UserStorageService,
    private _router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._check(route);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._check(redirectUrl);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @param route
   * @private
   */
  private _check(route?: any): Observable<boolean> {
    const token = UserStorageService.getToken();
    const user = UserStorageService.getUser();
    console.log(token)
    console.log(user)
    console.log(route?.data?.role)
    console.log(route?.data?.role)
    if (token) {
      if (route?.data?.role && !route?.data?.role?.includes(user?.userRole) ) {
        this.userStorageService.signOut();
        this._router.navigate(['login']);
        return of(false);
      }
      return of(true);
    }
    this._router.navigate(['login']);
    return of(false);
  }
}
