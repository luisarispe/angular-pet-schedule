import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pages/pets/pets.component';
import { PetsRoutingModule } from './pets-routing-module';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';

@NgModule({
  declarations: [PetsComponent],
  imports: [CommonModule, PetsRoutingModule, MaterialCdkModule],
})
export class PetsModule {}
