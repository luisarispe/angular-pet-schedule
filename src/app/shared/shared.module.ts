import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { FirstTitleUpperPipe } from './pipes/first-title-upper.pipe';

@NgModule({
  declarations: [LoaderComponent, FirstTitleUpperPipe],
  imports: [CommonModule, MaterialCdkModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderComponent,
    FirstTitleUpperPipe,
  ],
})
export class SharedModule {
  constructor() {}
}
