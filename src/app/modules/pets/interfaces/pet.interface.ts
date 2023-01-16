import { User } from 'src/app/core/interfaces/user.interface';
import { Owner } from '../../owners/interfaces/owner.interface';
import { Specie } from './specie.interface';

export interface Pet {
  id: string;
  name: string;
  sex: string;
  age: number;
  urlImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  species: Specie;
  owner: Owner;
  user: User;
}
