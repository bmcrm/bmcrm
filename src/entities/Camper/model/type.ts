export type Role = 'TCO' | 'lead' | 'qualified' | 'intent' | 'camper';
export type History = { year: number; text: string };
export interface ICamper {
  campName: string;
  campId: string;
  city: string;
  website: string;
  firstName: string;
  lastName: string;
  playaName: string;
  email: string;
  password: string;
  avatar?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  summary: string;
  history: History[];
}
