import {
  confirmEmail,
  confirmResetPassword,
  initResetPassword,
  loginUser,
  logoutUser,
  signUpUser,
} from 'shared/api/userAuth/userAuth';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import {
  CognitoIdentityProviderServiceException,
  ConfirmSignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { type IInputsData } from 'entities/User';
import { CamperRole } from 'entities/Camper';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  decodedIDToken: IIDToken | null;
  idToken: string;
  refreshToken: string;
  isLoading: boolean;
  error: CognitoIdentityProviderServiceException | null;
  resetError: () => void;
  register: (credentials: IInputsData) => Promise<unknown>;
  login: (values: { email: string; password: string }) => Promise<unknown>;
  confirmEmail: (data: ConfirmTypes) => Promise<ConfirmSignUpCommandOutput | undefined>;
  initResetPass: (values: InitResetType) => Promise<unknown>;
  confirmResetPass: (values: ConfirmResetType) => Promise<unknown>;
  logout: (accessToken: string) => Promise<void>;
  decodeIDToken: (token: string) => void;
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

interface IIDToken {
  aud: string;
  auth_time: number;
  'cognito:username': string;
  'custom:camp_id': string;
  'custom:camp_name'?: string;
  'custom:camp_website'?: string;
  'custom:city'?: string;
  'custom:created_at': string;
  'custom:first_name'?: string;
  'custom:last_name'?: string;
  'custom:playa_name'?: string;
  'custom:role': CamperRole;
  email: string;
  email_verified: boolean;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  sub: string;
  token_use: string;
  updated_at: number;
}

const useAuth = create<AuthState>()(
  devtools(
    persist(
      set => ({
        isLoggedIn: false,
        isLoading: false,
        decodedIDToken: null,
        accessToken: '',
        idToken: '',
        refreshToken: '',
        error: null,
        resetError: () => set({ error: null }),
        register: async credentials => {
          try {
            set({ isLoading: true });
            return await signUpUser(credentials);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          } finally {
            set({ isLoading: false });
          }
        },
        login: async values => {
          try {
            set({ isLoading: true });
            const user: IResponse | undefined = await loginUser(values);

            set({
              isLoggedIn: true,
              accessToken: user?.AccessToken,
              idToken: user?.IdToken,
              refreshToken: user?.RefreshToken,
            });

            return user;
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        confirmEmail: async data => {
          try {
            set({ isLoading: true });
            return await confirmEmail(data);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          } finally {
            set({ isLoading: false });
          }
        },
        initResetPass: async values => {
          try {
            set({ isLoading: true });
            return await initResetPassword(values);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          } finally {
            set({ isLoading: false });
          }
        },
        confirmResetPass: async values => {
          try {
            set({ isLoading: true });
            return await confirmResetPassword(values);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          } finally {
            set({ isLoading: false });
          }
        },
        logout: async (accessToken: string) => {
          try {
            await logoutUser(accessToken);

            set({
              isLoggedIn: false,
              decodedIDToken: null,
              accessToken: '',
              idToken: '',
              refreshToken: '',
            });
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          }
        },
        decodeIDToken: (token: string) => {
          try {
            const decodedToken = jwtDecode<IIDToken>(token);
            set({ decodedIDToken: decodedToken });
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
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
