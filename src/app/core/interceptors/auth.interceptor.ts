import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserSelector } from '../../store/user/user.selector';
import { SignOut } from 'src/app/store/user/user.actios';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    const _token: string = this._store.selectSnapshot<string>(
      UserSelector.getToken
    );

    if (req.url.includes('api/auth/login')) {
      return next.handle(req);
    }

    if (_token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + _token),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._store.dispatch(new SignOut());

          // Reload the app
          location.reload();
        }

        return throwError(() => error);
      })
    );
  }
}
