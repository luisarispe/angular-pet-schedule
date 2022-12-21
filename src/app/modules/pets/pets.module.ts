import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pages/pets/pets.component';
import { PetsRoutingModule } from './pets-routing-module';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';
import { PetDataSourceService } from './services/pet-data-source.service';
import { PetsCreateComponent } from './pages/pets-create/pets-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PetsComponent, PetsCreateComponent],
  imports: [CommonModule, PetsRoutingModule, MaterialCdkModule, SharedModule],
  providers: [PetDataSourceService],
})
export class PetsModule {}
