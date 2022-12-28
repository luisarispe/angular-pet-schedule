import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreenService } from './services/splash-screen.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(private _splashScreenService: SplashScreenService) {}
}
