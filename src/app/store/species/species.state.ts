import { State, Action, StateContext } from '@ngxs/store';
import { SpeciesStateModel } from './species.model';
import { AddSpecies } from './species.actions';
import { Injectable } from '@angular/core';

@State({
  name: 'species',
  defaults: {
    species: [],
  },
})
@Injectable()
export class SpeciesState {
  // Añade species al estado
  @Action(AddSpecies)
  addAll(
    { getState, patchState }: StateContext<SpeciesStateModel>,
    { payload }: AddSpecies
  ) {
    const state = getState();
    patchState({
      species: payload,
    });
  }
}
