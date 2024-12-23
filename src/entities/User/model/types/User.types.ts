import { CamperRole, type CamperSocial } from '@entities/Camper';

export interface ICamperRegisterForm {
  [key: string]: string | boolean | string[] | undefined;
  accept: boolean;
  first_name: string;
  last_name: string;
  playa_name: string;
  email: string;
  password: string;
  about_me?: string;
  social_links?: string[];
}

export interface ITCORegisterForm extends ICamperRegisterForm {
  city: string;
  camp_name: string;
  camp_id: string;
  camp_website: string;
}

export interface IUserRegisterData {
  first_name: string;
  last_name: string;
  playa_name: string;
  email: string;
  password: string;
  role: CamperRole;
  camp_id?: string;
  city?: string;
  camp_name?: string;
  camp_website?: string;
  about_me?: string;
  social_links?: CamperSocial[];
}

export interface ILoginData {
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

export interface ILoggedUser {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

export interface IConfirmRegistration {
  code: string;
  email: string;
}

export interface IConfirmResetPass {
  confirm_code: string;
  email: string;
  password_new: string;
}

export interface IInviteData {
  email: string;
  camp_id: string;
  idToken: string;
}

export interface IInitResetPassData {
  email: string;
}

export interface IConfirmResetPassData {
  code: string;
  email: string;
  password: string;
}