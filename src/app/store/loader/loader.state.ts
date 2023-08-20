import { Action, State, StateContext } from '@ngxs/store';
import { ChangeLoader } from './loader.actions';
import { LoaderStateModel } from './loader.model';
import { Injectable } from '@angular/core';

@State({
  name: 'loader',
  defaults: {
    loader: false,
  },
})
@Injectable()
export class LoaderState {
  @Action(ChangeLoader)
  changeLoader(
    { getState, patchState }: StateContext<LoaderStateModel>,
    { payload }: ChangeLoader
  ) {
    patchState({
      loader: payload,
    });
  }
}
