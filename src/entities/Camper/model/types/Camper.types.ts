export interface CamperHistory {
  year: string;
  value: string;
}

export interface CamperSocial {
  name: string;
  url: string;
}

export type CamperTags = {
  [key: string]: string[];
};

export interface FormikTag {
  tagName: string;
  tagDetails: string[];
}

export enum CamperRole {
  TCO = 'tco',
  COORG = 'co-organizer',
  PROSPECT = 'prospect',
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
  email_confirmed: boolean | 'adminCreated';
  about_me?: string;
  social_links?: CamperSocial[];
  history?: CamperHistory[];
  updated_at?: string;
  created_at: string;
  tags?: CamperTags;
  visitedBM?: string[];
  birthdayDate?: Date | null;
  createdBy?: string;
}

export type IFormikCamper = Omit<ICamper, 'tags'> & {
  tags: FormikTag[];
};

export interface IInviteCamperData {
  email: string;
  camp_id: string;
  idToken: string;
}

export type ICampersByRole = Record<CamperRole, ICamper[]>;
