import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
