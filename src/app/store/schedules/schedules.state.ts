import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HOURS } from 'src/app/modules/schedules/constants/hours.constants';
import {
  AddSchedule,
  AddSchedules,
  ChangeEnableDisabledHours,
  ResetHours,
} from './schedules.actions';
import { SchedulesStateModel } from './schedules.model';
import { TypeHour } from 'src/app/modules/schedules/interfaces/type-hour.enum';

@State({
  name: 'schedules',
  defaults: {
    hoursStart: HOURS,
    hoursEnd: HOURS,
    schedules: [],
  },
})
@Injectable()
export class SchedulesState {
  @Action(AddSchedules)
  addSchedules(
    { patchState }: StateContext<SchedulesStateModel>,
    { payload }: AddSchedules
  ) {
    patchState({ schedules: payload });
  }

  @Action(ChangeEnableDisabledHours)
  changeEnableDisabledHours(
    { patchState, getState }: StateContext<SchedulesStateModel>,
    { type, hour }: ChangeEnableDisabledHours
  ) {
    const { hoursEnd, hoursStart } = getState();
    if (type === TypeHour.HOUR_START) {
      const hoursEndNew = structuredClone(hoursEnd);
      hoursEndNew.map((hourEnd) => {
        hourEnd.disabled = hourEnd.hourKey <= hour ? true : false;
        return hourEnd;
      });
      patchState({ hoursEnd: hoursEndNew });
    } else {
      const hoursStartdNew = structuredClone(hoursStart);
      hoursStartdNew.map((hourStart) => {
        hourStart.disabled = hourStart.hourKey >= hour ? true : false;
        return hourStart;
      });
      patchState({ hoursStart: hoursStartdNew });
    }
  }

  @Action(ResetHours)
  resetHours({ patchState }: StateContext<SchedulesStateModel>) {
    patchState({
      hoursEnd: HOURS,
      hoursStart: HOURS,
    });
  }
}
