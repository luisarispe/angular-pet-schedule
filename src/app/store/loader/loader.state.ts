import { Action, State, StateContext } from '@ngxs/store';
import { ChangeLoader } from './loader.actions';
import { LoaderStateModel } from './loader.model';

@State({
  name: 'loader',
  defaults: {
    loader: false,
  },
})
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
