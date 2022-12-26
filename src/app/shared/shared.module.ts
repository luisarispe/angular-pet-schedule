import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SplashScreenService } from './services/splash-screen.service';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { FirstTitleUpperPipe } from './pipes/first-title-upper.pipe';

const declarables = [
  HeaderComponent,
  FooterComponent,
  LoaderComponent,
  FirstTitleUpperPipe,
];

@NgModule({
  declarations: [declarables, LoaderComponent],
  imports: [CommonModule, MaterialCdkModule],
  exports: [declarables, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {
  constructor(private _splashScreenService: SplashScreenService) {}
}
