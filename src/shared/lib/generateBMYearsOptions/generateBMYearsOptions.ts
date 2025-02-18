export const BMYearsOptions = (currentYear: number) => (
	Array.from({ length: currentYear - 1985 }, (_, index) => {
		const year = currentYear - index;
		return { value: year.toString(), label: year.toString() };
	})
);