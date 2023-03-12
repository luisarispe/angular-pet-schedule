import { Owner } from 'src/app/modules/owners/interfaces/owner.interface';
import { OwnersStateModel } from './owners.model';

export class AddOwners {
  static readonly type = '[Owners] Add';
  constructor(public payload: OwnersStateModel) {}
}
