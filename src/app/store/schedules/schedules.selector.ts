import { Selector } from '@ngxs/store';
import { SchedulesStateModel } from './schedules.model';
import { SchedulesState } from './schedules.state';
import { Schedule } from 'src/app/modules/schedules/interfaces/schedule.interface';

export class SchedulesSelector {
  @Selector([SchedulesState])
  static getHoursStart(state: SchedulesStateModel) {
    return state.hoursStart;
  }

  @Selector([SchedulesState])
  static getHoursEnd(state: SchedulesStateModel) {
    return state.hoursEnd;
  }

  @Selector([SchedulesState])
  static getSchedules(state: SchedulesStateModel): Schedule[] {
    return state.schedules;
  }
}
