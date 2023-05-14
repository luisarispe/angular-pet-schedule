import { Selector } from '@ngxs/store';
import { UserState } from './user.state';
import { UserStateModel } from './user.model';
import { User } from 'src/app/core/interfaces/user.interface';

export class UserSelector {
  @Selector([UserState])
  static getData(state: UserStateModel): UserStateModel {
    return state;
  }

  @Selector([UserState])
  static getUser(state: UserStateModel): User {
    return state.user;
  }
  @Selector([UserState])
  static getToken(state: UserStateModel): string {
    return state.token;
  }
  @Selector([UserState])
  static getAuthenticated(state: UserStateModel): boolean {
    return state.authenticated;
  }
}
