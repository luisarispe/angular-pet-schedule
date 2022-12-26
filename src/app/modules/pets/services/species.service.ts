import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  pipe,
  tap,
  catchError,
  of,
  delay,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Specie } from '../interfaces/specie-interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private _species: BehaviorSubject<Specie[]> = new BehaviorSubject<Specie[]>(
    []
  );
  public species$: Observable<Specie[]> = this._species.asObservable();

  constructor(private _http: HttpClient) {}

  set species(value: Specie[]) {
    this._species.next(value);
  }

  getAll(): Observable<Specie[]> {
    return this._http.get<Specie[]>(`${base_url}api/species`).pipe(
      tap((species: Specie[]) => {
        this.species = species;
      }),
      catchError(() => {
        this.species = [];
        return of([]);
      })
    );
  }
}
