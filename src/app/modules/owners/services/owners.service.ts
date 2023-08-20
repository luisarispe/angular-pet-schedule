import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, of, tap } from 'rxjs';
import { Owner } from '../interfaces/owner.interface';
import { environment } from '../../../../environments/environment';
import { OwnerForm } from '../interfaces/owner-form.interface';
import { Store } from '@ngxs/store';
import { AddOwners } from 'src/app/store/owners/owners.actions';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  private _offset: number = 0;

  constructor(private _http: HttpClient, private _store: Store) {}

  findAll(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'owner.fullName',
    filter: string = ''
  ): Observable<{ count: number; owners: Owner[] }> {
    pageIndex == 0 ? (this._offset = 0) : (this._offset = pageIndex * pageSize);

    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', this._offset.toString())
      .set('sortDirection', sortDirection.toLocaleUpperCase())
      .set('sortColum', sortActive)
      .set('filter', filter.toLocaleLowerCase().trim());

    return this._http
      .get<{ count: number; owners: Owner[] }>(`${base_url}api/owners`, {
        params: params,
      })
      .pipe(
        tap((resp: { count: number; owners: Owner[] }) => {
          this._store.dispatch(
            new AddOwners({ owners: resp.owners, count: resp.count })
          );
        }),
        catchError((_) => {
          this._store.dispatch(new AddOwners({ owners: [], count: 0 }));
          return of({ count: 0, owners: [] });
        })
      );
  }

  findOne(id: string): Observable<Owner> {
    return this._http.get<Owner>(`${base_url}api/owners/${id}`);
  }

  remove(id: string): Observable<Owner> {
    return this._http.delete<Owner>(`${base_url}api/owners/${id}`);
  }

  create(ownerForm: OwnerForm): Observable<Owner> {
    return this._http.post<Owner>(`${base_url}api/owners`, ownerForm);
  }
  update(ownerForm: OwnerForm, id: string): Observable<Owner> {
    return this._http.patch<Owner>(`${base_url}api/owners/${id}`, ownerForm);
  }
}
