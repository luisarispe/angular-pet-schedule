import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInForm } from '../interfaces/sign-in-form.interface';
import { environment } from 'src/environments/environment';
import { map, switchMap, Observable, of } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { Store } from '@ngxs/store';
import { AddUser } from '../../../store/user/user.actios';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(private _http: HttpClient, private _store: Store) {}

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  signIn(signInForm: SignInForm): Observable<{ user: User; token: string }> {
    return this._http
      .post<{ user: User; token: string }>(
        `${base_url}api/auth/login`,
        signInForm
      )
      .pipe(
        map((resp) => {
          this.accessToken = resp.token;
          this._authenticated = true;
          this._store.dispatch(new AddUser(resp.user));
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
          this.accessToken = resp.token;
          this._authenticated = true;
          this._store.dispatch(new AddUser(resp.user));
          return of(true);
        }
      })
    );
  }

  signOut(): Observable<boolean> {
    this._authenticated = false;
    this.accessToken = '';
    return of(true);
  }
  checkAuth(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }

    if (
      !this.accessToken ||
      this.accessToken === '' ||
      this.accessToken === undefined
    ) {
      return of(false);
    }
    return this.refreshToken();
  }
}
