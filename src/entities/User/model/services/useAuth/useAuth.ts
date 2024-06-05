import { loginUser } from 'shared/api/cognito.ts';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  accessToken: string;
  logout: () => void;
  idToken: string;
  refreshToken: string;
}

export interface IResponse {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

const useAuth = create<AuthState>()(
  devtools(
    persist(
      set => ({
        isLoggedIn: false,
        accessToken: '',
        idToken: '',
        refreshToken: '',
        login: async values => {
          const user: IResponse | undefined = await loginUser(values);

          if (!user) return;

          set({
            isLoggedIn: true,
            accessToken: user.AccessToken,
            idToken: user.IdToken,
            refreshToken: user.RefreshToken,
          });
        },

        logout: () => set({ isLoggedIn: false, accessToken: '', idToken: '', refreshToken: '' }),
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useAuth;
