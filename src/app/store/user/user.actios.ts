import { User } from '../../core/interfaces/user.interface';
export class AddUser {
  static readonly type = '[User] Add';
  constructor(public payload: User) {}
}

export class AddToken {
  static readonly type = '[User] Add token';
  constructor(public token: string) {}
}

export class SignOut {
  static readonly type = '[User] SignOut';
  constructor() {}
}
