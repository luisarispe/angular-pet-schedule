import { Selector } from '@ngxs/store';
import { UserState } from './user.state';
import { UserStateModel } from './user.model';

export class UserSelector {
  @Selector([UserState])
  static getUser(state: UserStateModel) {
    return state.user;
  }
}
