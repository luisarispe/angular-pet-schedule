import { Selector } from '@ngxs/store';
import { PetsStateModel } from './pets.model';
import { PetsState } from './pets.state';

export class PetsSelector {
  @Selector([PetsState])
  static getPets(state: PetsStateModel) {
    return state.pets;
  }
  @Selector([PetsState])
  static countPets(state: PetsStateModel) {
    return state.count;
  }
}
