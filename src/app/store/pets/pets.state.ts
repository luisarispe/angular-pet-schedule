import { Action, State, StateContext } from '@ngxs/store';
import { AddPets } from './pets.actions';
import { PetsStateModel } from './pets.model';
import { Injectable } from '@angular/core';

@State({
  name: 'pets',
  defaults: {
    pets: [],
    count: 0,
  },
})
@Injectable()
export class PetsState {
  @Action(AddPets)
  addAll(
    { getState, patchState }: StateContext<PetsStateModel>,
    { payload }: AddPets
  ) {
    patchState({
      pets: payload.pets,
      count: payload.count,
    });
  }
}
