import { Selector } from '@ngxs/store';
import { LoaderState } from './loader.state';
import { LoaderStateModel } from './loader.model';

export class LoaderSelector {
  @Selector([LoaderState])
  static getLoader(state: LoaderStateModel) {
    return state.loader;
  }
}
