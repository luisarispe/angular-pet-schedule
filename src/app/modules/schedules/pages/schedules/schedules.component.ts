import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { Select } from '@ngxs/store';
import { SchedulesSelector } from 'src/app/store/schedules/schedules.selector';
import { Schedule } from '../../interfaces/schedule.interface';
import { Router } from '@angular/router';
import { ScheduleService } from '../../services/schedules.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FirstTitleUpperPipe } from 'src/app/shared/pipes/first-title-upper.pipe';

const colors: Record<string, EventColor> = {
  cancelado: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  realizado: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  pendiente: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
})
export class SchedulesComponent implements OnInit, OnDestroy {
  @Select(SchedulesSelector.getSchedules) schedules$!: Observable<Schedule[]>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  private _destroyed$ = new Subject();

  constructor(
    private _router: Router,
    private _service: ScheduleService,
    private _datePipe: DatePipe,
    private _firstTitlePipe: FirstTitleUpperPipe,
    private _titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this._service.findAll().pipe(take(1)).subscribe();
    this.loadSchedules();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  loadSchedules() {
    this.schedules$.pipe(takeUntil(this._destroyed$)).subscribe({
      next: (resp) => {
        this.events = resp.map((schedule) => {
          const { status, id, dateStart, dateEnd } = schedule;

          const titleComplete = this.createTitle(schedule);
          return {
            id,
            title: titleComplete,
            start: new Date(dateStart),
            end: new Date(dateEnd),
            color: colors[status],
            draggable: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          };
        });
        this.refresh.next();
      },
      error: () => {
        this.events = [];
        this.refresh.next();
      },
    });
  }
  createTitle(schedule: Schedule): string {
    const { status, pet, title, dateStart, dateEnd } = schedule;

    const titleComplete = `Estado: ${this._firstTitlePipe.transform(
      status
    )}, Mascota: ${this._titleCasePipe.transform(
      pet.name
    )}, Propietario: ${this._titleCasePipe.transform(
      pet.owner.fullName
    )}, Titulo: ${this._firstTitlePipe.transform(
      title
    )} Hora: ${this._datePipe.transform(
      dateStart,
      'shortTime'
    )} | ${this._datePipe.transform(dateEnd, 'shortTime')}`;

    return titleComplete;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Clicked')
      this._router.navigate(['/schedules/create'], {
        queryParams: { id: event.id },
      });
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  redirectCreate() {
    this._router.navigateByUrl('/schedules/create');
  }
}
