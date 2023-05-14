import { User } from 'src/app/core/interfaces/user.interface';

export interface UserStateModel {
  user: User;
  token: string;
  authenticated: boolean;
}
