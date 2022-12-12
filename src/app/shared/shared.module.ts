import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const declarables = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [declarables],
  imports: [CommonModule],
  exports: [declarables],
})
export class SharedModule {}
