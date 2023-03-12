import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ChangeLoader } from 'src/app/store/loader/loader.actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._store.dispatch(new ChangeLoader(true));

    return next
      .handle(request)
      .pipe(finalize(() => this._store.dispatch(new ChangeLoader(false))));
  }
}
