import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet.interface';
import { PetsService } from './pets.service';

@Injectable()
export class PetsDataSourceService extends DataSource<Pet> {
  constructor(private _petService: PetsService) {
    super();
  }
  connect(): Observable<Pet[]> {
    return this._petService.pets$;
  }

  disconnect(): void {}
  load(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'pet.name',
    filter: string = ''
  ): void {
    this._petService
      .findAll(pageIndex, pageSize, sortDirection, sortActive, filter)
      .subscribe();
  }
}
