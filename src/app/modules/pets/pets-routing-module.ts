import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pages/pets/pets.component';
import { PetsCreateComponent } from './pages/pets-create/pets-create.component';

const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
  },
  {
    path: 'create',
    component: PetsCreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
