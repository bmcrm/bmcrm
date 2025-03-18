export const dateFormatter = (date: string | Date, formatType: 'withYear' | 'withoutYear' = 'withYear') => {
	if (!date) return '';

	const parsedDate = new Date(date);

	if (formatType === 'withoutYear') {
		const localizedDate = parsedDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });

		return localizedDate.replace(/[.,\/\s-]*\d{4}/, '').trim();
	}

	return parsedDate.toLocaleDateString();
};