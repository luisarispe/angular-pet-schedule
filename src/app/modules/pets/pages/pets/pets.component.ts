import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
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
import { PetDataSourceService } from '../../services/pet-data-source.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  countPets: number = 0;
  displayedColumns: string[] = [
    'pet.name',
    'pet.sex',
    'pet.age',
    'species.name',
    'pet.createdAt',
    'pet.updatedAt',
    'actions',
  ];
  dataSource = new PetDataSourceService(this._petService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputFilter') inputFilter: ElementRef = {} as ElementRef;

  constructor(private _petService: PetService, private _router: Router) {
    this._petService.countPets$.pipe(takeUntil(this._destroyed$)).subscribe({
      next: (count) => (this.countPets = count),
      error: () => (this.countPets = 0),
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
    this._router.navigateByUrl('/pets/create');
  }
  redirectUpdate(id: string): void {
    this._router.navigate(['/pets/create'], { queryParams: { id } });
  }
  remove(id: string) {
    this._petService.remove(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.load();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
