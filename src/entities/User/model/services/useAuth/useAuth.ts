import {
  confirmEmail,
  confirmResetPassword,
  initResetPassword,
  loginUser,
  signUpUser
} from 'shared/api/userAuth/userAuth';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ConfirmSignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { type IInputsData } from 'entities/User';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  idToken: string;
  refreshToken: string;
  isLoading: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  confirm: (data: ConfirmTypes) => Promise<ConfirmSignUpCommandOutput>;
  register: (credentials: IInputsData) => Promise<void>;
  logout: () => void;
  initResetPass: (values: InitResetType) => Promise<unknown>;
  confirmResetPass: (values: ConfirmResetType) => Promise<unknown>;
}

export interface IResponse {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

type ConfirmTypes = {
  code: string;
  email: string;
};

type InitResetType = {
  email: string;
};

type ConfirmResetType = {
  confirmCode: string;
  email: string;
  newPassword: string;
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
        register: async credentials => {
          try {
            set({ isLoading: true });
            signUpUser(credentials);
          } catch (error) {
            console.error(error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        logout: () => set({ isLoggedIn: false, accessToken: '', idToken: '', refreshToken: '' }),
        confirm: async data => {
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
        initResetPass: async (values) => {
          try {
            set({ isLoading: true });
            const response = await initResetPassword(values);

            return response;
          } catch (error) {
            console.error(error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        confirmResetPass: async (values) => {
          try {
            set({ isLoading: true });
            const response = await confirmResetPassword(values);

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
