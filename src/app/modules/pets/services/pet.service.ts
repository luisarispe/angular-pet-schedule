import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pet } from '../interfaces/pet-interface';
import { PetForm } from '../interfaces/pet-form-interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private _offset: number = 0;
  private _pets: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);
  private _countPets: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public pets$: Observable<Pet[]> = this._pets.asObservable();
  public countPets$: Observable<number> = this._countPets.asObservable();

  constructor(private _http: HttpClient) {}

  set pets(value: Pet[]) {
    this._pets.next(value);
  }
  set countPets(value: number) {
    this._countPets.next(value);
  }

  getAll(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'name',
    filter: string = ''
  ) {
    pageIndex == 0 ? (this._offset = 0) : (this._offset = pageIndex * pageSize);

    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', this._offset.toString())
      .set('sortDirection', sortDirection.toLocaleUpperCase())
      .set('sortColum', sortActive)
      .set('filter', filter.toLocaleLowerCase().trim());

    return this._http
      .get<{ count: number; pets: Pet[] }>(`${base_url}api/pets`, {
        params: params,
      })
      .pipe(
        tap((resp: { count: number; pets: Pet[] }) => {
          this.pets = resp.pets;
          this.countPets = resp.count;
        }),
        catchError((_) => {
          this.pets = [];
          return of();
        })
      );
  }
  create(petForm: PetForm, file?: File | null): Observable<Pet> {
    const formData = new FormData();

    formData.append('name', petForm.name);
    formData.append('age', petForm.age.toString());
    formData.append('idSpecies', petForm.idSpecies.toString());
    formData.append('sex', petForm.sex);
    if (file) {
      formData.append('file', file);
    }

    return this._http
      .post<Pet>(`${base_url}api/pets`, formData)
      .pipe(delay(5000));
  }
}
