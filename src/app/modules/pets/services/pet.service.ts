import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pet } from '../interfaces/pet-interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private _pets: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);
  public pets$: Observable<Pet[]> = this._pets.asObservable();

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

  getAll(): Observable<Pet[]> {
    this.isLoading = true;
    return this._http.get<Pet[]>(`${base_url}api/pets?limit=800`).pipe(
      tap((pets: Pet[]) => {
        this.pets = pets;
        this.isLoading = false;
      }),
      catchError((_) => {
        this.pets = [];
        this.isLoading = false;
        return of([]);
      })
    );
  }
  create(): Observable<Pet> {
    const pet = {
      name: 'Michi4' + Math.random(),
      age: 2,
      idSpecies: 2,
      sex: 'hembra',
    };
    return this._http.post<Pet>(`${base_url}api/pets`, pet);
  }
}
