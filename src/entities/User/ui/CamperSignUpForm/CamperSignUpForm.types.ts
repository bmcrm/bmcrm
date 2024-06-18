import { CamperRole } from 'entities/Camper';

export interface ICamperRegisterForm {
  accept: boolean;
  firstName: string;
  lastName: string;
  playaName: string;
  email: string;
  password: string;
}

export interface ICamperRegisterData {
  firstName: string;
  lastName: string;
  playaName: string;
  email: string;
  password: string;
  role: CamperRole;
}