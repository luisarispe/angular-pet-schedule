import { User } from 'src/app/core/interfaces/user.interface';
import { Pet } from '../../pets/interfaces/pet.interface';

export interface Owner {
  id: string;
  fullName: string;
  email: string;
  rut: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  countryCallingCode?: string;
  nationalNumber?: string;
  pets: Pet[];
}
