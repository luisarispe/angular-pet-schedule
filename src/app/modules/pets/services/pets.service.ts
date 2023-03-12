import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pet } from '../interfaces/pet.interface';
import { PetForm } from '../interfaces/pet-form.interface';
import { Store } from '@ngxs/store';
import { AddPets } from 'src/app/store/pets/pets.actions';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private _offset: number = 0;

  constructor(private _http: HttpClient, private _store: Store) {}

  findAll(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'pet.name',
    filter: string = ''
  ): Observable<{ count: number; pets: Pet[] }> {
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
          this._store.dispatch(
            new AddPets({ pets: resp.pets, count: resp.count })
          );
        }),
        catchError((_) => {
          this._store.dispatch(new AddPets({ pets: [], count: 0 }));
          return of({ count: 0, pets: [] });
        })
      );
  }

  create(petForm: PetForm, file?: File | null): Observable<Pet> {
    const formData = new FormData();

    formData.append('name', petForm.name);
    formData.append('age', petForm.age.toString());
    formData.append('idSpecies', petForm.idSpecies.toString());
    formData.append('sex', petForm.sex);
    formData.append('idOwner', petForm.idOwner);

    if (file) {
      formData.append('file', file);
    }

    return this._http.post<Pet>(`${base_url}api/pets`, formData);
  }

  update(petForm: PetForm, id: string, file?: File | null) {
    const formData = new FormData();

    formData.append('name', petForm.name);
    formData.append('age', petForm.age.toString());
    formData.append('idSpecies', petForm.idSpecies.toString());
    formData.append('sex', petForm.sex);
    formData.append('idOwner', petForm.idOwner);

    if (file) {
      formData.append('file', file);
    }

    return this._http.patch<Pet>(`${base_url}api/pets/${id}`, formData);
  }

  findOne(id: string): Observable<Pet> {
    return this._http.get<Pet>(`${base_url}api/pets/${id}`);
  }

  remove(id: string): Observable<Pet> {
    return this._http.delete<Pet>(`${base_url}api/pets/${id}`);
  }
}
