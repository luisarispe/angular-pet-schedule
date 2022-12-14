import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../interfaces/pet-interface';
import { PetService } from '../../services/pet.service';
import { Observable } from 'rxjs';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]> = new Observable();
  isLoading: Observable<boolean> = new Observable();
  displayedColumns: string[] = [
    'name',
    'sex',
    'age',
    'species',
    'createdAt',
    'updatedAt',
  ];
  dataSource!: MatTableDataSource<Pet>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _petService: PetService) {
    this._petService.getAll().subscribe();
    this.pets$ = this._petService.pets$;
    this.isLoading = this._petService.isLoading$;
  }
  ngOnInit(): void {
    this.pets$.subscribe({
      next: (pets) => {
        this.dataSource = new MatTableDataSource(pets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  opeAddModal() {
    this._petService.create().subscribe({
      next: (result) => {
        this._petService.getAll().subscribe();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
