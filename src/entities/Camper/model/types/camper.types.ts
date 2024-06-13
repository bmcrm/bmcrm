export interface CamperHistory {
  year: number;
  value: string;
}

export interface CamperSocial {
  name: string;
  url: string;
}

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
  avatar?: string;
  email_confirmed: boolean;
  summary?: string;
  social_links?: CamperSocial[];
  history?: CamperHistory[];
  updated_at: string;
  created_at: string;
}