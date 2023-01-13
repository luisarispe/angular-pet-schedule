import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './pages/owners/owners.component';
import { OwnersCreateComponent } from './pages/owners-create/owners-create.component';

const routes: Routes = [
  {
    path: '',
    component: OwnersComponent,
  },
  {
    path: 'create',
    component: OwnersCreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersRoutingModule {}
