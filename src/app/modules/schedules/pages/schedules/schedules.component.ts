import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { formatDate } from '@angular/common';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
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
export class SchedulesComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 1),
      end: addHours(new Date(), 1),
      title: 'Llevar al veterinario a mi perro a las 2pm hasta las 3pm',
      color: { ...colors['red'] },
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    },
  ];
  activeDayIsOpen: boolean = false;

  scheduleForm: FormGroup = this._formBuild.group({
    title: ['', [Validators.required]],
    date: ['', [Validators.required]],
    start: [null, [Validators.required]],
    end: [null, [Validators.required]],
  });
  data: Date = new Date('2023-01-20T02:30:00.000Z');

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
  });

  constructor(private _formBuild: FormBuilder) {}
  addSchedule() {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    const { title, date, start, end } = this.scheduleForm.value;
    const dates = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const dateStart = dates + ' ' + start + ':00';
    const dateEnd = dates + ' ' + end + ':00';
    this.events = [
      ...this.events,
      {
        meta: {
          id: 1,
        },
        id: this.events.length + 1,
        title: title,
        start: new Date(dateStart),
        end: new Date(dateEnd),
        color: colors['red'],
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
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
    console.log(action, event);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
