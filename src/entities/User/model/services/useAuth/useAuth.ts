import { confirmEmail, loginUser } from 'shared/api/cognito.ts';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ConfirmSignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

interface AuthState {
  isLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  accessToken: string;
  logout: () => void;
  idToken: string;
  refreshToken: string;
  isLoading: boolean;
  confirm: (data: ConfirmTypes) => Promise<ConfirmSignUpCommandOutput>;
}

export interface IResponse {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

type ConfirmTypes = {
  code: string,
  email: string;
};

const useAuth = create<AuthState>()(
  devtools(
    persist(
      set => ({
        isLoggedIn: false,
        accessToken: '',
        idToken: '',
        refreshToken: '',
        isLoading: false,
        login: async values => {
          try {
            set({ isLoading: true });
            const user: IResponse | undefined = await loginUser(values);

            if (!user) return;

            set({
              isLoggedIn: true,
              accessToken: user.AccessToken,
              idToken: user.IdToken,
              refreshToken: user.RefreshToken,
            });
          } catch (error) {
            console.error(error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        logout: () => set({ isLoggedIn: false, accessToken: '', idToken: '', refreshToken: '' }),
        confirm: async data  => {
          try {
            set({ isLoading: true });
            const response = await confirmEmail(data);

            return response;
          } catch (error) {
            console.error(error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useAuth;
