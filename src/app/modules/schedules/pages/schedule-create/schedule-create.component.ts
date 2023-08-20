import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  takeUntil,
} from 'rxjs';
import { Owner } from 'src/app/modules/owners/interfaces/owner.interface';
import { OwnersService } from 'src/app/modules/owners/services/owners.service';
import { Pet } from 'src/app/modules/pets/interfaces/pet.interface';
import { OwnersSelector } from 'src/app/store/owners/owners.selector';
import { Hour } from '../../interfaces/hour.interface';
import { SchedulesSelector } from 'src/app/store/schedules/schedules.selector';
import {
  ChangeEnableDisabledHours,
  ResetHours,
} from 'src/app/store/schedules/schedules.actions';
import { TypeHour } from '../../interfaces/type-hour.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../interfaces/schedule.interface';
import { ScheduleService } from '../../services/schedules.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css'],
})
export class ScheduleCreateComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  createLoad: boolean = false;
  errorCreate: string[] = [];
  pets$: Observable<Pet[]> = new Observable();
  public typeHour = TypeHour;
  public idSchedule: string | null = null;
  @Select(SchedulesSelector.getHoursStart) hoursStart$!: Observable<Hour[]>;
  @Select(SchedulesSelector.getHoursEnd) hoursEnd$!: Observable<Hour[]>;
  @Select(OwnersSelector.getOwners) owners$!: Observable<Owner[]>;
  @Select(SchedulesSelector.getSchedules) schedules$!: Observable<Schedule[]>;

  scheduleForm: FormGroup = this._formBuild.group({
    title: ['', [Validators.required]],
    date: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    idOwner: ['', [Validators.required]],
    status: ['', [Validators.required]],
    idPet: ['', [Validators.required]],
  });
  searchFilterOwner: FormControl<string> = new FormControl<any>('');

  constructor(
    private _formBuild: FormBuilder,
    private _store: Store,
    private _ownersService: OwnersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: ScheduleService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.idSchedule = this._route.snapshot.queryParamMap.get('id');
    if (this.idSchedule) this.findOne();

    this._store.dispatch(new ResetHours());

    this.searchFilterOwner.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe((search) => this.filterOwners(search));
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  create(): void {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;

    this._service.create(this.scheduleForm.value).subscribe({
      complete: () => {
        this.createLoad = false;
        this._router.navigateByUrl('schedules');
      },
      error: (error) => {
        this.errorCreate = Array.isArray(error.error.message)
          ? error.error.message
          : [error.error.message];
        this.createLoad = false;
      },
    });
  }

  update(): void {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;

    if (this.idSchedule === null) return this.redirect();

    this._service.update(this.scheduleForm.value, this.idSchedule).subscribe({
      complete: () => {
        this.createLoad = false;
        this._router.navigateByUrl('schedules');
      },
      error: (error) => {
        this.errorCreate = Array.isArray(error.error.message)
          ? error.error.message
          : [error.error.message];
        this.createLoad = false;
      },
    });
  }

  filterOwners(value: string): void {
    this.scheduleForm.controls['idPet'].setValue('');
    if (value.length < 1) return;
    this._ownersService
      .findAll(0, 5, 'asc', 'owner.fullName', value.toLocaleLowerCase())
      .pipe(takeUntil(this._destroyed$))
      .subscribe();
  }

  onOwnerChange(event: any): void {
    this.scheduleForm.controls['idPet'].setValue('');
    this.owners$.pipe(takeUntil(this._destroyed$)).subscribe({
      next: (owners) => {
        const owner = owners.find((owner) => owner.id === event.value);
        if (owner?.pets) this.pets$ = of(owner!.pets);
      },
      error: () => {
        this.pets$ = of([]);
      },
    });
  }

  changeOurs(hour: string, typeHour: TypeHour): void {
    this._store.dispatch(new ChangeEnableDisabledHours(typeHour, hour));
  }

  redirect(): void {
    this._router.navigateByUrl('/schedules');
  }

  clearForm(): void {
    this.scheduleForm.reset();
  }

  findOne(): void {
    this._service.findOne(this.idSchedule!).subscribe({
      next: (resp: Schedule) => {
        const { title, pet, idPet, status, dateEnd, dateStart } = resp;
        this.filterOwners(pet.owner.fullName);
        this.onOwnerChange({ value: pet.owner.id });
        const end = this._datePipe.transform(dateEnd, 'shortTime') || '';
        const start = this._datePipe.transform(dateStart, 'shortTime') || '';
        this.scheduleForm.patchValue({
          title,
          idOwner: pet.owner.id,
          status,
          idPet,
          date: new Date(dateEnd).toISOString(),
          end,
          start,
        });
        this.changeOurs(start, TypeHour.HOUR_START);
        this.changeOurs(end, TypeHour.HOUR_END);
      },
      error: () => {
        this.redirect();
      },
    });
  }
}
