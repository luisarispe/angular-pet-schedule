import { Action, State, StateContext } from '@ngxs/store';
import { AddUser, AddToken, SignOut } from './user.actios';
import { UserStateModel } from './user.model';
import { User } from 'src/app/core/interfaces/user.interface';
import { Injectable } from '@angular/core';

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
@Injectable()
export class UserState {
  constructor() {}

  @Action(AddUser)
  add(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    patchState({
      user: payload,
      authenticated: true,
    });
  }

  @Action(AddToken)
  addToken({ patchState }: StateContext<UserStateModel>, { token }: AddToken) {
    localStorage.setItem('accessToken', token);
    patchState({
      token,
    });
  }

  @Action(SignOut)
  signOut({ patchState }: StateContext<UserStateModel>) {
    localStorage.removeItem('accessToken');
    patchState({
      token: '',
      authenticated: false,
    });
  }
}
