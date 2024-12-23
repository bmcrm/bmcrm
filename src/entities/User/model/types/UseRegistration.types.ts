import type { IUserRegisterData, IConfirmRegistration } from './User.types';

export enum IRegisterStage {
	REGISTRATION = 'registration',
	CONFIRMATION = 'confirmation',
}

export interface IRegisterPayload {
	stage: IRegisterStage;
	data: IUserRegisterData | IConfirmRegistration;
}