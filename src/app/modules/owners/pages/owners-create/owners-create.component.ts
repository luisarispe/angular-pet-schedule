import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dataCodePhone } from '../../../../shared/data/code-phone';
import { CodePhone } from 'src/app/core/interfaces/code-phone';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners-create',
  templateUrl: './owners-create.component.html',
  styleUrls: ['./owners-create.component.css'],
})
export class OwnersCreateComponent implements OnInit, OnDestroy {
  idOwner: any = null;
  private _destroyed$ = new Subject();
  createLoad: boolean = false;
  errorCreate: string[] = [];
  codesPhone: CodePhone[] = [];
  filteredOptions$: Observable<CodePhone[]> = new Observable<CodePhone[]>();

  ownerForm: FormGroup = this._formbuild.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    rut: ['', [Validators.required]],
    countryCallingCode: ['', [Validators.required]],
    nationalNumber: ['', [Validators.required]],
  });

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formbuild: FormBuilder,
    private _ownersService: OwnersService
  ) {
    this.codesPhone = dataCodePhone;
  }
  ngOnInit(): void {
    this.idOwner = this._route.snapshot.queryParamMap.get('id');
    if (this.idOwner) {
      this.findOne();
    }

    this.filteredOptions$ = this.ownerForm.controls[
      'countryCallingCode'
    ].valueChanges.pipe(
      takeUntil(this._destroyed$),
      startWith(''),
      map((value) => this._filtercodePhone(value || ''))
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  findOne(): void {
    this._ownersService
      .findOne(this.idOwner)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (owner) => {
          this.ownerForm.patchValue({
            fullName: owner.fullName,
            email: owner.email,
            rut: owner.rut,
            countryCallingCode: owner.countryCallingCode,
            nationalNumber: owner.nationalNumber,
          });
        },
        error: (error) => (this.idOwner = null),
      });
  }

  clearForm(): void {
    this.ownerForm.reset();
  }

  private _filtercodePhone(value: string): CodePhone[] {
    const filterValue = value;
    return this.codesPhone.filter((code) =>
      code.dial_code.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  create(): void {
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;

    const { countryCallingCode, nationalNumber, ...res } = this.ownerForm.value;

    this._ownersService
      .create({ ...res, phone: `+${countryCallingCode}${nationalNumber}` })
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (res) => {
          this.createLoad = false;
          this.redirect();
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
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;

    const { countryCallingCode, nationalNumber, ...res } = this.ownerForm.value;

    this._ownersService
      .update(
        { ...res, phone: `+${countryCallingCode}${nationalNumber}` },
        this.idOwner
      )
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (res) => {
          this.createLoad = false;
          this.redirect();
        },
        error: (error) => {
          this.errorCreate = Array.isArray(error.error.message)
            ? error.error.message
            : [error.error.message];
          this.createLoad = false;
        },
      });
  }

  redirect(): void {
    this._router.navigateByUrl('/owners');
  }
}
