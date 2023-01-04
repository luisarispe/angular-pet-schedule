import { NgModule } from '@angular/core';
import { PetsComponent } from './pages/pets/pets.component';
import { PetsRoutingModule } from './pets-routing';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';
import { PetDataSourceService } from './services/pet-data-source.service';
import { PetsCreateComponent } from './pages/pets-create/pets-create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PetsComponent, PetsCreateComponent],
  imports: [MaterialCdkModule, SharedModule, PetsRoutingModule],
  providers: [PetDataSourceService],
})
export class PetsModule {}
