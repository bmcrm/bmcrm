export enum InputsType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
}

export interface IShiftResponse {
	items: IShift[];
}

interface IShiftTime {
	start_time: Date;
	end_time?: Date;
}

export interface IShift {
	camp_id: string;
	created_at: string;
	updated_at?: string | null;
	shift_id: string;
	title: string;
	description: string;
	members: string[];
	start_date?: Date | null;
	end_date?: Date | null;
	time: IShiftTime[];
	files?: string[];
}