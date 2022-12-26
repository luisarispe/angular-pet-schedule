import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet-interface';
import { PetService } from './pet.service';

@Injectable()
export class PetDataSourceService extends DataSource<Pet> {
  constructor(private petService: PetService) {
    super();
  }
  connect(): Observable<Pet[]> {
    return this.petService.pets$;
  }

  disconnect(): void {}
  load(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'pet.name',
    filter: string = ''
  ): void {
    this.petService
      .findAll(pageIndex, pageSize, sortDirection, sortActive, filter)
      .subscribe();
  }
}
