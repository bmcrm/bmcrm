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
  COORG = 'co-organizer',
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  INTENT = 'intent',
  CAMPER = 'camper',
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
  about_me?: string;
  social_links?: CamperSocial[];
  history?: CamperHistory[];
  updated_at: string | number;
  created_at: string | number;
}
