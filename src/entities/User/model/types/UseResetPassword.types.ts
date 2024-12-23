import type { IInitResetPassData, IConfirmResetPassData } from '../types/User.types';

export enum IResetPassStages {
	INIT = 'init',
	CONFIRM = 'confirm',
	SUCCESS = 'success',
}

export interface IResetPassPayload {
	stage: IResetPassStages;
	data: IInitResetPassData | IConfirmResetPassData;
}