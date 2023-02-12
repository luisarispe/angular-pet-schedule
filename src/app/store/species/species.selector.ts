import { Selector } from '@ngxs/store';
import { SpeciesStateModel } from './species.model';
import { SpeciesState } from './species.state';

export class SpeciesSelector {
  @Selector([SpeciesState])
  static getSpecies(state: SpeciesStateModel) {
    return state.species;
  }
}
