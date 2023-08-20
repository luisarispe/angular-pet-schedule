import { User } from 'src/app/core/interfaces/user.interface';
import { Pet } from '../../pets/interfaces/pet.interface';

export interface Schedule {
  id: string;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  status: string;
  idPet: string;
  idUser: string;
  createdAt: Date;
  updatedAt: Date;
  pet: Pet;
  user: User;
}
