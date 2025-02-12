import type { IShift } from '../model/types/Shift.types';

export const generateShiftFormValues = (currentShift?: IShift | null): Partial<IShift> => ({
	title: currentShift?.title ?? '',
	description: currentShift?.description ?? '',
	members: currentShift?.members ?? [],
	start_date: currentShift?.start_date ? new Date(currentShift.start_date) : null,
	end_date: currentShift?.end_date ? new Date(currentShift.end_date) : null,
	time: currentShift?.time && currentShift.time.length > 0
		? currentShift.time.map((t) => ({
			start_time: new Date(t.start_time),
			end_time: t.end_time ? new Date(t.end_time) : undefined,
		}))
		: [{
			start_time: (() => {
				const now = new Date();
				now.setHours(0, 0, 0, 0);
				return now;
			})(),
		}],
});