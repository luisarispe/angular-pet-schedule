import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserSelector } from '../../store/user/user.selector';
import { Store } from '@ngxs/store';
import { UserStateModel } from 'src/app/store/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _store: Store,
    private _router: Router,
    private _authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._checkAuth();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return true;
  }

  private _checkAuth(): Observable<boolean> {
    const { token, authenticated }: UserStateModel =
      this._store.selectSnapshot<UserStateModel>(UserSelector.getData);

    if (authenticated) {
      return of(true);
    }

    if (!token || token === '' || token === undefined) {
      this._router.navigateByUrl('/auth/sign-in');
      return of(false);
    }
    return this._authService.refreshToken().pipe(
      switchMap((authenticated) => {
        if (!authenticated) {
          this._router.navigateByUrl('/auth/sign-in');
          return of(false);
        }
        return of(true);
      })
    );
  }
}
