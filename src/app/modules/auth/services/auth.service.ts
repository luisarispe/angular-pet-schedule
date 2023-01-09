import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInForm } from '../interfaces/sign-in-form.interface';
import { environment } from 'src/environments/environment';
import { map, switchMap, tap, Observable, of, catchError } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(private _http: HttpClient, private _userService: UserService) {}

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
          this._userService.user = resp.user;
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
          this._userService.user = resp.user;
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
