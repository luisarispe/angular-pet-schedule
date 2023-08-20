import { NgModule } from '@angular/core';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulesRoutingModule } from './schedules.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';
import { ScheduleCreateComponent } from './pages/schedule-create/schedule-create.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FirstTitleUpperPipe } from 'src/app/shared/pipes/first-title-upper.pipe';

@NgModule({
  declarations: [SchedulesComponent, ScheduleCreateComponent],
  imports: [
    SharedModule,
    MaterialCdkModule,
    SchedulesRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [DatePipe, FirstTitleUpperPipe, TitleCasePipe],
})
export class SchedulesModule {}
