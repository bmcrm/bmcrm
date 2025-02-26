import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { localStorageVars } from '@shared/const/localStorage';
import type { IIDToken } from '../types/User.types';

interface IUserState {
	isLoggedIn: boolean;
	tokens: {
		accessToken: string;
		refreshToken: string;
		idToken: string;
		decodedIDToken: IIDToken | null;
	};
	set: (newState: Partial<IUserState>) => void;
	resetState: () => void;
}

const userState = create<IUserState>()(
	devtools(
		persist(
			(set) => ({
				isLoggedIn: false,
				tokens: {
					accessToken: '',
					refreshToken: '',
					idToken: '',
					decodedIDToken: null,
				},
				set: (newState) => set((state) => ({ ...state, ...newState })),
				resetState: () => {
					set({
						isLoggedIn: false,
						tokens: {
							accessToken: '',
							refreshToken: '',
							idToken: '',
							decodedIDToken: null,
						},
					});
				},
			}),
			{
				name: localStorageVars.AUTH,
				storage: createJSONStorage(() => localStorage),
			},
		)
	)
);

export { userState };
