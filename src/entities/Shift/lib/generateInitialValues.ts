import type { IShift } from '../model/types/Shift.types';

export const generateShiftFormValues = (currentShift?: IShift | null): Partial<IShift> => ({
	title: currentShift?.title ?? '',
	description: currentShift?.description ?? '',
	members: currentShift?.members ?? [],
	start_date: currentShift?.start_date ? new Date(currentShift.start_date) : null,
	end_date: currentShift?.end_date ? new Date(currentShift.end_date) : null,
	time: currentShift?.time ?? [
		{
			start_time: (() => {
				const now = new Date();
				now.setHours(0, 0, 0, 0);
				return now;
			})(),
		}
	],
});