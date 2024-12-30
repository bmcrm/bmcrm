import { useCallback } from 'react';
import { localStorageVars } from '@shared/const/localStorage';

export const useLocalStorage = () => {

	const setStorage = useCallback(
		(key: localStorageVars, value: string) => localStorage.setItem(key, value),
		[]
	);

	const getStorage = useCallback(
		(value: localStorageVars) => localStorage.getItem(value),
		[]
	);

	const removeStorage = useCallback(
		(value: localStorageVars) => localStorage.removeItem(value),
		[]
	);

	const clearStorage = useCallback(() => localStorage.clear(), []);

	return { setStorage, getStorage, removeStorage, clearStorage };
};