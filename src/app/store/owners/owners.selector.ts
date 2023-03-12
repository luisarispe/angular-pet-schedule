import { Selector } from '@ngxs/store';
import { OwnersState } from './owners.state';
import { OwnersStateModel } from './owners.model';

export class OwnersSelector {
  @Selector([OwnersState])
  static getOwners(state: OwnersStateModel) {
    return state.owners;
  }

  @Selector([OwnersState])
  static countOwners(state: OwnersStateModel) {
    return state.count;
  }
}
