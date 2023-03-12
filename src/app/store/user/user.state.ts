import { Action, State, StateContext } from '@ngxs/store';
import { AddUser } from './user.actios';
import { UserStateModel } from './user.model';
import { User } from 'src/app/core/interfaces/user.interface';

const userDefault: User = {
  id: '',
  fullName: 'No usuario',
  email: 'nousuario@test.com',
  isActive: true,
  createdAt: new Date(),
};

@State({
  name: 'user',
  defaults: {
    user: userDefault,
    authenticated: false,
    token: localStorage.getItem('accessToken') ?? '',
  },
})
export class UserState {
  @Action(AddUser)
  add(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    patchState({
      user: payload,
    });
  }
}
