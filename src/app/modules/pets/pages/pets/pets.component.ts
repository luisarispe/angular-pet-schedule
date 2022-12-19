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
import { PetDataSourceService } from '../../services/pet-data-source.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> = new Observable();
  private _destroyed$ = new Subject();
  countPets: number = 0;
  displayedColumns: string[] = [
    'pet.name',
    'pet.sex',
    'pet.age',
    'species.name',
    'pet.createdAt',
    'pet.updatedAt',
  ];
  dataSource = new PetDataSourceService(this._petService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputFilter') inputFilter: ElementRef = {} as ElementRef;

  constructor(private _petService: PetService, private _router: Router) {
    this.isLoading$ = this._petService.isLoading$;
    this._petService.countPets$.pipe(takeUntil(this._destroyed$)).subscribe({
      next: (count) => (this.countPets = count),
      error: () => (this.countPets = 0),
    });
  }
  ngOnInit(): void {
    this.dataSource.loadPet();
  }
  ngAfterViewInit(): void {
    this.searchPets();
    this.paginaterSortPage();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  loadPets(): void {
    this.dataSource.loadPet(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active,
      this.inputFilter.nativeElement.value
    );
  }

  searchPets(): void {
    fromEvent(this.inputFilter.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPets();
        })
      )
      .subscribe();
  }

  paginaterSortPage(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadPets();
          takeUntil(this._destroyed$);
        })
      )
      .subscribe();
  }

  sendCreate(): void {
    this._router.navigateByUrl('/pets/create');
    // this.router.navigate(['/pets/create'], { queryParams: { id: 0 } });
  }
}
