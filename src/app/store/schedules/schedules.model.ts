import { Hour } from 'src/app/modules/schedules/interfaces/hour.interface';
import { Schedule } from 'src/app/modules/schedules/interfaces/schedule.interface';

export interface SchedulesStateModel {
  schedules: Schedule[];
  hoursStart: Hour[];
  hoursEnd: Hour[];
}
