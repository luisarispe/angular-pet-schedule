import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnersService } from './owners.service';
import { Owner } from '../interfaces/owner.interface';
import { Select, Store } from '@ngxs/store';
import { OwnersSelector } from 'src/app/store/owners/owners.selector';
import { AddOwners } from 'src/app/store/owners/owners.actions';

@Injectable()
export class OwnersDataSourceService extends DataSource<Owner> {
  @Select(OwnersSelector.getOwners) owners$!: Observable<Owner[]>;
  constructor(private _ownersService: OwnersService) {
    super();
  }
  connect(): Observable<Owner[]> {
    return this.owners$;
  }

  disconnect(): void {}
  load(
    pageIndex: number = 0,
    pageSize: number = 5,
    sortDirection: string = 'asc',
    sortActive: string = 'owner.fullName',
    filter: string = ''
  ): void {
    this._ownersService
      .findAll(pageIndex, pageSize, sortDirection, sortActive, filter)
      .subscribe();
  }
}
