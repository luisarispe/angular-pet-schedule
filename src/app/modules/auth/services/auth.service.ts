import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInForm } from '../interfaces/sign-in-form.interface';
import { environment } from 'src/environments/environment';
import { map, switchMap, Observable, of } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { Store } from '@ngxs/store';
import { AddUser, AddToken } from '../../../store/user/user.actios';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _store: Store) {}

  signIn(signInForm: SignInForm): Observable<{ user: User; token: string }> {
    return this._http
      .post<{ user: User; token: string }>(
        `${base_url}api/auth/login`,
        signInForm
      )
      .pipe(
        map((resp) => {
          this._store.dispatch([
            new AddUser(resp.user),
            new AddToken(resp.token),
          ]);
          return resp;
        })
      );
  }

  refreshToken(): Observable<boolean> {
    return this._http.get(`${base_url}api/auth/check-status`).pipe(
      switchMap((resp: any) => {
        if (resp.status === 401) {
          return of(false);
        } else {
          this._store.dispatch([
            new AddUser(resp.user),
            new AddToken(resp.token),
          ]);
          return of(true);
        }
      })
    );
  }
}
