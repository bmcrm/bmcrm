export type History = { year: number; text: string };

export enum CamperRole {
  TCO = 'tco',
  LEAD = 'lead',
  INTENT = 'intent',
  CAMPER = 'camper',
  QUALIFIED = 'qualified',
}

export interface ICamper {
  camp_id: string;
  email: string;
  city: string;
  camp_name: string;
  first_name: string;
  last_name: string;
  playa_name?: string;
  camp_website?: string;
  role: CamperRole;
  email_confirmed: boolean;
  avatar?: string;
  summary?: string;
  history?: History[];
}
