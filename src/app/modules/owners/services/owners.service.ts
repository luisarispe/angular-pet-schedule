import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Owner } from '../interfaces/owner.interface';
import { environment } from '../../../../environments/environment';
import { OwnerForm } from '../interfaces/owner-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  private _owners: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>([]);
  public owners$: Observable<Owner[]> = this._owners.asObservable();
  private _offset: number = 0;
  private _countOwners: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public countOwners$: Observable<number> = this._countOwners.asObservable();

  constructor(private _http: HttpClient) {}

  set owners(value: Owner[]) {
    this._owners.next(value);
  }

  set countOwners(value: number) {
    this._countOwners.next(value);
  }

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
          this.owners = resp.owners;
          this.countOwners = resp.count;
        }),
        catchError((_) => {
          this.owners = [];
          this.countOwners = 0;
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
