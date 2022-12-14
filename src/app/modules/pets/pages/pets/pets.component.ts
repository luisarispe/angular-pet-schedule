import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../interfaces/pet-interface';

const pets: Pet[] = [
  {
    id: '363259b7-a14f-4ddb-87f1-e65425015355',
    name: 'boby',
    sex: 'masculino',
    age: 10,
    urlImage: null,
    createdAt: new Date('2022-12-13T14:52:43.325Z'),
    updatedAt: new Date('2022-12-13T14:52:43.325Z'),
    species: {
      id: 1,
      name: 'perro',
      createdAt: new Date('2022-12-13T14:52:43.293Z'),
      updatedAt: new Date('2022-12-13T14:52:43.293Z'),
    },
  },
  {
    id: '80aa787a-c3ed-4f73-88d5-87dcaa7d4456',
    name: 'firulais',
    sex: 'masculino',
    age: 2,
    urlImage: null,
    createdAt: new Date('2022-12-13T14:52:43.328Z'),
    updatedAt: new Date('2022-12-13T14:52:43.328Z'),
    species: {
      id: 1,
      name: 'perro',
      createdAt: new Date('2022-12-13T14:52:43.293Z'),
      updatedAt: new Date('2022-12-13T14:52:43.293Z'),
    },
  },
  {
    id: '937b0819-88d7-4d44-a26d-d36d0728e36d',
    name: 'mochiberto',
    sex: 'masculino',
    age: 4,
    urlImage: null,
    createdAt: new Date('2022-12-13T14:52:43.322Z'),
    updatedAt: new Date('2022-12-13T14:52:43.322Z'),
    species: {
      id: 1,
      name: 'perro',
      createdAt: new Date('2022-12-13T14:52:43.293Z'),
      updatedAt: new Date('2022-12-13T14:52:43.293Z'),
    },
  },
  {
    id: 'a964e837-fc18-4835-8a4d-a5aec0c93942',
    name: 'michi',
    sex: 'feminino',
    age: 2,
    urlImage: null,
    createdAt: new Date('2022-12-13T14:52:43.327Z'),
    updatedAt: new Date('2022-12-13T14:52:43.327Z'),
    species: {
      id: 1,
      name: 'perro',
      createdAt: new Date('2022-12-13T14:52:43.293Z'),
      updatedAt: new Date('2022-12-13T14:52:43.293Z'),
    },
  },
  {
    id: 'aba20d9e-5580-4d73-889e-cc9c159d8ea2',
    name: 'cachupin',
    sex: 'feminino',
    age: 1,
    urlImage: null,
    createdAt: new Date('2022-12-13T14:52:43.318Z'),
    updatedAt: new Date('2022-12-13T14:52:43.318Z'),
    species: {
      id: 1,
      name: 'perro',
      createdAt: new Date('2022-12-13T14:52:43.293Z'),
      updatedAt: new Date('2022-12-13T14:52:43.293Z'),
    },
  },
];

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'sex',
    'age',
    'species',
    'createdAt',
    'updatedAt',
  ];
  dataSource: MatTableDataSource<Pet>;
  dataSource2: MatTableDataSource<Pet>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(pets);
    this.dataSource2 = new MatTableDataSource(pets);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
