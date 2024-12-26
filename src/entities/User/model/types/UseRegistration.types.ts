import type { IConfirmRegistration, ICamperRegistrationData, ITCORegistrationData } from './User.types';

export enum IRegistrationStage {
	REGISTRATION_TCO = 'registrationTCO',
	REGISTRATION_CAMPER = 'registrationCamper',
	CONFIRMATION = 'confirmation',
}

export interface IRegisterPayload {
	stage: IRegistrationStage;
	data: ITCORegistrationData | ICamperRegistrationData | IConfirmRegistration;
}