import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../interfaces/schedule.interface';
import { AddSchedules } from 'src/app/store/schedules/schedules.actions';
import { ScheduleForm } from '../interfaces/schedule-form.interface';
import { formatDate } from '@angular/common';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private _http: HttpClient, private _store: Store) {}

  findAll(): Observable<Schedule[]> {
    return this._http.get<Schedule[]>(`${base_url}api/schedules`).pipe(
      tap((resp: Schedule[]) => this._store.dispatch(new AddSchedules(resp))),
      catchError((_) => this._store.dispatch(new AddSchedules([])))
    );
  }

  create(scheduleForm: ScheduleForm): Observable<Schedule> {
    const { date, start, end, idPet, status, title } = scheduleForm;
    const dates = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const dateStart = dates + ' ' + start + ':00';
    const dateEnd = dates + ' ' + end + ':00';

    const scheduleBody = {
      dateStart,
      dateEnd,
      idPet,
      status,
      title,
    };

    return this._http.post<Schedule>(`${base_url}api/schedules`, scheduleBody);
  }

  update(scheduleForm: ScheduleForm, id: string): Observable<Schedule> {
    const { date, start, end, idPet, status, title } = scheduleForm;
    const dates = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const dateStart = dates + ' ' + start + ':00';
    const dateEnd = dates + ' ' + end + ':00';

    const scheduleBody = {
      dateStart,
      dateEnd,
      idPet,
      status,
      title,
    };

    return this._http.patch<Schedule>(
      `${base_url}api/schedules/${id}`,
      scheduleBody
    );
  }

  findOne(id: string): Observable<Schedule> {
    return this._http.get<Schedule>(`${base_url}api/schedules/${id}`);
  }
}
