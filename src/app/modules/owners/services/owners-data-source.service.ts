import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnersService } from './owners.service';
import { Owner } from '../interfaces/owner.interface';

@Injectable()
export class OwnersDataSourceService extends DataSource<Owner> {
  constructor(private _ownersService: OwnersService) {
    super();
  }
  connect(): Observable<Owner[]> {
    return this._ownersService.owners$;
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
