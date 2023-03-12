import { Specie } from 'src/app/modules/pets/interfaces/specie.interface';

export class AddSpecies {
  static readonly type = '[Specie] Add';
  constructor(public payload: Specie[]) {}
}
