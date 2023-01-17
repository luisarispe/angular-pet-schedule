import { NgModule } from '@angular/core';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulesRoutingModule } from './schedules.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';

@NgModule({
  declarations: [SchedulesComponent],
  imports: [
    SharedModule,
    MaterialCdkModule,
    SchedulesRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class SchedulesModule {}
