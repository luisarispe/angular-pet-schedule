import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap, catchError, of, delay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Specie } from '../interfaces/specie.interface';
import { Store } from '@ngxs/store';
import { AddSpecies } from 'src/app/store/species/species.actions';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  constructor(private _http: HttpClient, private _store: Store) {}

  getAll(): Observable<Specie[]> {
    return this._http.get<Specie[]>(`${base_url}api/species`).pipe(
      tap((species: Specie[]) => {
        this._store.dispatch(new AddSpecies(species));
      }),
      catchError(() => {
        this._store.dispatch(new AddSpecies([]));
        return of([]);
      })
    );
  }
}
