import { TypeHour } from 'src/app/modules/schedules/interfaces/type-hour.enum';
import { SchedulesStateModel } from './schedules.model';
import { ScheduleForm } from 'src/app/modules/schedules/interfaces/schedule-form.interface';
import { Schedule } from 'src/app/modules/schedules/interfaces/schedule.interface';

export class AddSchedules {
  static readonly type = '[Schedules] Add';
  constructor(public payload: Schedule[]) {}
}

export class ChangeEnableDisabledHours {
  static readonly type =
    '[Schedules] change hours enable or disabled for select form';
  constructor(public type: TypeHour, public hour: string) {}
}

export class ResetHours {
  static readonly type = '[Schedules] reset hours default';
  constructor() {}
}

export class AddSchedule {
  static readonly type = '[Schedule] add schedule';
  constructor(public form: ScheduleForm) {}
}
