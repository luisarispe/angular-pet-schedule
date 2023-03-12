import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  takeUntil,
  tap,
} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { OwnersDataSourceService } from '../../services/owners-data-source.service';
import { OwnersService } from '../../services/owners.service';
import { Owner } from '../../interfaces/owner.interface';
import { Select, Selector } from '@ngxs/store';
import { OwnersSelector } from 'src/app/store/owners/owners.selector';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
})
export class OwnersComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  countOwners: number = 0;
  displayedColumns: string[] = [
    'owner.fullName',
    'owner.rut',
    'owner.email',
    'owner.phone',
    'owner.createdAt',
    'owner.updatedAt',
    'user.fullName',
    'actions',
  ];
  @Select(OwnersSelector.countOwners) countOwners$!: Observable<number>;

  dataSource = new OwnersDataSourceService(this._ownersService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputFilter') inputFilter: ElementRef = {} as ElementRef;

  constructor(private _ownersService: OwnersService, private _router: Router) {
    this.countOwners$.pipe(takeUntil(this._destroyed$)).subscribe({
      next: (count) => (this.countOwners = count),
      error: () => (this.countOwners = 0),
    });
  }

  ngOnInit(): void {
    this.dataSource.load();
  }
  ngAfterViewInit(): void {
    this.search();
    this.paginaterSortPage();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  load(): void {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active,
      this.inputFilter.nativeElement.value
    );
  }

  search(): void {
    fromEvent(this.inputFilter.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.load();
        })
      )
      .subscribe();
  }

  paginaterSortPage(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.load();
          takeUntil(this._destroyed$);
        })
      )
      .subscribe();
  }

  redirectCreate(): void {
    this._router.navigateByUrl('/owners/create');
  }

  redirectUpdate(id: string): void {
    this._router.navigate(['/owners/create'], { queryParams: { id } });
  }

  remove(owner: Owner) {
    Confirm.show(
      '',
      `Está seguro de eliminar el propietario: "${owner.fullName}"?`,
      'Si',
      'No',
      () => {
        this._ownersService.remove(owner.id).subscribe({
          complete: () => this.load(),
          error: (error) =>
            Notify.failure('No fue posible elimiar el propietario'),
        });
      }
    );
  }
}
