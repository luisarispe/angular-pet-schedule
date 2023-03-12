import { PetsStateModel } from './pets.model';

export class AddPets {
  static readonly type = '[Pets] Add]';
  constructor(public payload: PetsStateModel) {}
}
