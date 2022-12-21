import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreenService } from './services/splash-screen.service';

const declarables = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [declarables],
  imports: [CommonModule],
  exports: [declarables, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {
  constructor(private _splashScreenService: SplashScreenService) {}
}
