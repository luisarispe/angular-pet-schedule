import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SpeciesService } from './services/species.service';
import { Specie } from './interfaces/specie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesResolver implements Resolve<any> {
  constructor(private _speciesService: SpeciesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Specie[]> {
    return this._speciesService.getAll();
  }
}
