import { User } from '../../core/interfaces/user.interface';
export class AddUser {
  static readonly type = '[User] Add';
  constructor(public payload: User) {}
}

export class ChangeAuthenticated {
  static readonly type = '[Authenticated Change]';
  constructor(public payload: boolean) {}
}

export class ChangeToken {
  static readonly type = '[Token Change]';
  constructor(public payload: string) {}
}
