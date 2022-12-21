import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { ThisReceiver } from '@angular/compiler';
import { SpeciesService } from '../../services/species.service';
import { Observable } from 'rxjs';
import { Specie } from '../../interfaces/specie-interface';

@Component({
  selector: 'app-pets-create',
  templateUrl: './pets-create.component.html',
  styleUrls: ['./pets-create.component.css'],
})
export class PetsCreateComponent implements OnInit {
  id: any;
  imagenTmp: string | null = null;
  private file?: File | null;
  errorImage: boolean = false;
  createLoad: boolean = false;
  petForm: FormGroup = this._formbuild.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    idSpecies: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });

  species$: Observable<Specie[]> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formbuild: FormBuilder,
    private _petService: PetService,
    private _speciesService: SpeciesService
  ) {
    this.species$ = this._speciesService.species$;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    // console.log(this.id);
  }
  clearForm() {
    this.imagenTmp = null;
    this.file = null;
    this.errorImage = false;
    this.petForm.reset();
  }
  sendPets() {
    this.router.navigateByUrl('/pets');
    // this.router.navigate(['/pets/create'], { queryParams: { id: 0 } });
  }
  private _readAsDataURL(file: File): Promise<any> {
    // Return a new promise
    return new Promise((resolve, reject) => {
      // Create a new reader
      const reader = new FileReader();

      // Resolve the promise on success
      reader.onload = (): void => {
        resolve(reader.result);
      };

      // Reject the promise on error
      reader.onerror = (e): void => {
        reject(e);
      };

      // Read the file as the
      reader.readAsDataURL(file);
    });
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

    this._readAsDataURL(file).then((data) => {
      // Update the image
      this.errorImage = false;
      this.imagenTmp = data;
      this.file = fileList[0];
    });
  }
  create() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
    this.createLoad = true;
    this._petService.create(this.petForm.value, this.file).subscribe({
      next: (res) => {
        this.createLoad = false;
        this.router.navigateByUrl('/pets');
      },
      error: (error) => {
        this.createLoad = false;
        console.log(error);
      },
    });
  }
}
