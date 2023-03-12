import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet.interface';
import { PetsService } from './pets.service';
import { Select } from '@ngxs/store';
import { PetsSelector } from 'src/app/store/pets/pets.selector';

@Injectable()
export class PetsDataSourceService extends DataSource<Pet> {
  @Select(PetsSelector.getPets) pets$!: Observable<Pet[]>;
  constructor(private _petService: PetsService) {
    super();
  }
  connect(): Observable<Pet[]> {
    return this.pets$;
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
