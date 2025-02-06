import type { FilterFn, Row } from '@tanstack/react-table';
import type { CamperTags, ICamper } from '@entities/Camper';

export const multiValueFilter = <TData>(
	row: Row<TData>,
	columnId: string,
	filterValue: unknown,
): boolean => {
	const cellValue = row.getValue(columnId);

	if (Array.isArray(filterValue)) {
		return filterValue.includes(cellValue);
	}

	return filterValue === cellValue;
};

export const filterTags: FilterFn<ICamper> = (row, columnId, filterValue) => {
	const tags = row.getValue(columnId) as CamperTags;

	if (!tags || typeof tags !== 'object') {
		return false;
	}

	return Object.entries(tags).some(([key, values]) => {
		const matchesKey = key.toLowerCase().includes(filterValue.toLowerCase());

		const matchesValues = Array.isArray(values)
			? values.some(value => value.toLowerCase().includes(filterValue.toLowerCase()))
			: false;

		return matchesKey || matchesValues;
	});
};