import type { Row } from '@tanstack/react-table';

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