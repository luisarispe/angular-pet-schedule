import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PetService } from '../../services/pet.service';
import { SpeciesService } from '../../services/species.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { Specie } from '../../interfaces/specie-interface';

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
  petForm: FormGroup = this._formbuild.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    idSpecies: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });

  species$: Observable<Specie[]> = new Observable();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formbuild: FormBuilder,
    private _petService: PetService,
    private _speciesService: SpeciesService,
    private _helperService: HelpersService
  ) {
    this.species$ = this._speciesService.species$;
  }

  ngOnInit(): void {
    this.idPet = this._route.snapshot.queryParamMap.get('id');
    if (this.idPet) {
      this.findOne();
    }
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  findOne(): void {
    this._petService
      .findOne(this.idPet)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (pet) => {
          this.petForm.patchValue({
            name: pet.name,
            age: pet.age,
            idSpecies: pet.species.id,
            sex: pet.sex,
          });
          this.imagenTmp = pet.urlImage;
        },
        error: (error) => {
          this.idPet = null;
        },
      });
  }
  clearForm(): void {
    this.imagenTmp = null;
    this.file = null;
    this.errorImage = false;
    this.errorCreate = [];
    this.petForm.reset();
  }
  redirectPets(): void {
    this._router.navigateByUrl('/pets');
  }

  uploadImage(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      this.errorImage = true;
      this.imagenTmp = null;
      this.file = null;
      return;
    }

    this._helperService.readAsDataURL(file).then((data) => {
      // Update the image
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
    this._petService
      .create(this.petForm.value, this.file)
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
  update() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;
    this._petService
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
}
