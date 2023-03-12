import { Pet } from 'src/app/modules/pets/interfaces/pet.interface';

export interface PetsStateModel {
  pets: Pet[];
  count: number;
}
