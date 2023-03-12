import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { PetsService } from '../../services/pets.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { Specie } from '../../interfaces/specie.interface';
import { Owner } from 'src/app/modules/owners/interfaces/owner.interface';
import { OwnersService } from 'src/app/modules/owners/services/owners.service';
import { Select, Store } from '@ngxs/store';
import { SpeciesSelector } from 'src/app/store/species/species.selector';
import { OwnersSelector } from 'src/app/store/owners/owners.selector';
import { AddOwners } from 'src/app/store/owners/owners.actions';

@Component({
  selector: 'app-pets-create',
  templateUrl: './pets-create.component.html',
  styleUrls: ['./pets-create.component.css'],
})
export class PetsCreateComponent implements OnInit, OnDestroy {
  idPet: any = null;
  imagenTmp: string | null = null;
  private file?: File | null;
  errorImage: boolean = false;
  createLoad: boolean = false;
  errorCreate: string[] = [];
  private _destroyed$ = new Subject();
  searchFilterCtrl: FormControl<string> = new FormControl<any>('');
  petForm: FormGroup = this._formbuild.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    idSpecies: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    idOwner: ['', [Validators.required]],
  });
  @Select(SpeciesSelector.getSpecies) species$!: Observable<Specie[]>;
  @Select(OwnersSelector.getOwners) owners$!: Observable<Owner[]>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formbuild: FormBuilder,
    private _petsService: PetsService,
    private _helperService: HelpersService,
    private _ownersService: OwnersService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._store.dispatch(new AddOwners({ owners: [], count: 0 }));
    this.idPet = this._route.snapshot.queryParamMap.get('id');
    if (this.idPet) {
      this.findOne();
    }
    this.searchFilterCtrl.valueChanges
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

  findOne(): void {
    this._petsService
      .findOne(this.idPet)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (pet) => {
          this.filterOwners(pet.owner.fullName);
          this.petForm.patchValue({
            name: pet.name,
            age: pet.age,
            idSpecies: pet.species.id,
            sex: pet.sex,
            idOwner: pet.owner.id,
          });
          this.imagenTmp = pet.urlImage;
        },
        error: (error) => (this.idPet = null),
      });
  }

  clearForm(): void {
    this.imagenTmp = null;
    this.file = null;
    this.errorImage = false;
    this.errorCreate = [];
    this.petForm.reset();
  }

  redirect(): void {
    this._router.navigateByUrl('/pets');
  }

  uploadImage(fileList: FileList): void {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    if (!allowedTypes.includes(file.type) || file.size >= 3000000) {
      this.errorImage = true;
      this.imagenTmp = null;
      this.file = null;
      return;
    }

    this._helperService.readAsDataURL(file).then((data) => {
      this.errorImage = false;
      this.imagenTmp = data;
      this.file = fileList[0];
    });
  }

  create(): void {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;
    this._petsService
      .create(this.petForm.value, this.file)
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

  update() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;
    this._petsService
      .update(this.petForm.value, this.idPet, this.file)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (res) => {
          this.createLoad = false;
          this._router.navigateByUrl('/pets');
        },
        error: (error) => {
          this.errorCreate = Array.isArray(error.error.message)
            ? error.error.message
            : [error.error.message];
          this.createLoad = false;
        },
      });
  }

  filterOwners(value: string) {
    if (value.length < 1) return;
    this._ownersService
      .findAll(0, 5, 'asc', 'owner.fullName', value.toLocaleLowerCase())
      .pipe(takeUntil(this._destroyed$))
      .subscribe();
  }
}
