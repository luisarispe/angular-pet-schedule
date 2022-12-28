import { NgModule } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

const declaration = [
  MatTableModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatIconModule,
  MatProgressBarModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [declaration],
  exports: [declaration],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }],
})
export class MaterialCdkModule {}
