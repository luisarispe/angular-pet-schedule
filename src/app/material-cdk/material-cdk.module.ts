import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { getSpainPaginatorIntl } from './spain-paginator-intl';
import { MatIconModule } from '@angular/material/icon';

const declaration = [
  FormsModule,
  ReactiveFormsModule,
  MatTableModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [declaration],
  exports: [declaration],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }],
})
export class MaterialCdkModule {}
