import { CamperRole, type CamperSocial } from '@entities/Camper';

export interface ICamperRegistrationData {
  first_name: string;
  last_name: string;
  playa_name: string;
  email: string;
  password: string;
  about_me?: string;
  social_links?: CamperSocial[];
  accept: boolean;
  role?: CamperRole;
}

export interface ITCORegistrationData extends ICamperRegistrationData {
  camp_id: string;
  city: string;
  camp_name: string;
  camp_website: string;
}

export interface IConfirmRegistration {
  code: string;
  email: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IInitResetPassData {
  email: string;
}

export interface IConfirmResetPassData {
  code: string;
  email: string;
  password: string;
}

export interface IIDToken {
  aud: string;
  auth_time: number;
  'cognito:username': string;
  camp_id: string;
  camp_name?: string;
  camp_website?: string;
  city?: string;
  created_at: string;
  first_name?: string;
  last_name?: string;
  playa_name?: string;
  role: CamperRole;
  email: string;
  email_verified: boolean;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  sub: string;
  token_use: string;
  updated_at: number;
}