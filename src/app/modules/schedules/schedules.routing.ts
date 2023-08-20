import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { ScheduleCreateComponent } from './pages/schedule-create/schedule-create.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent,
  },
  {
    path: 'create',
    component: ScheduleCreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesRoutingModule {}
