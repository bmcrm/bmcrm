export const inventoryKeys = {
	allInventory: ['inventory', 'all'] as const,
	allCategories: ['categories', 'all'] as const,
	currentCategory: (category: string) => (['category', 'current', category]) as const,
	searchByTitle: (title: string) => ['inventory', 'search', title] as const,
};