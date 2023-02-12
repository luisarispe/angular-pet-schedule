import { State, Action, StateContext } from '@ngxs/store';
import { SpeciesStateModel } from './species.model';
import { AddSpecies, RemoveSpecies } from './species.actions';

@State({
  name: 'species',
  defaults: {
    species: [],
  },
})
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

  // Eliminar todas las species
  @Action(RemoveSpecies)
  remove({ patchState }: StateContext<SpeciesStateModel>, {}: RemoveSpecies) {
    patchState({
      species: [],
    });
  }
}
