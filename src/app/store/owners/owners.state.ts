import { Action, State, StateContext } from '@ngxs/store';
import { AddOwners } from './owners.actions';
import { OwnersStateModel } from './owners.model';
import { Owner } from 'src/app/modules/owners/interfaces/owner.interface';

@State({
  name: 'owners',
  defaults: {
    owners: [],
    count: 0,
  },
})
export class OwnersState {
  @Action(AddOwners)
  addAll(
    { getState, patchState }: StateContext<OwnersStateModel>,
    { payload }: AddOwners
  ) {
    patchState({
      owners: payload.owners,
      count: payload.count,
    });
  }
}
