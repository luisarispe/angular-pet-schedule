import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pet } from '../interfaces/pet-interface';

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

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading$: Observable<boolean> = this._isLoading.asObservable();
  constructor(private _http: HttpClient) {}

  set pets(value: Pet[]) {
    this._pets.next(value);
  }
  set isLoading(value: boolean) {
    this._isLoading.next(value);
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
    this.isLoading = true;

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
          this.isLoading = false;
          this.countPets = resp.count;
        }),
        catchError((_) => {
          this.pets = [];
          this.isLoading = false;
          return of();
        })
      );
  }
  create(): Observable<Pet> {
    const pet = {
      name: 'Michi4' + Math.random(),
      age: 2,
      idSpecies: 6,
      sex: 'hembra',
    };
    return this._http.post<Pet>(`${base_url}api/pets`, pet);
  }
}
