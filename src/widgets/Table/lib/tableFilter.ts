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

export const filterTagsByKey: FilterFn<ICamper> = (row, columnId, filterValue) => {
	const tags = row.getValue(columnId) as CamperTags;

	if (!tags || typeof tags !== 'object') {
		return false;
	}

	return Object.keys(tags).some((key) =>
		key.toLowerCase().includes(filterValue.toLowerCase())
	);
};