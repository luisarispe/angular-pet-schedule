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
}
