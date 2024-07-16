import {
  confirmEmail,
  confirmResetPassword,
  initResetPassword,
  inviteUser,
  loginUser,
  logoutUser,
  refreshUserTokens,
} from 'shared/api/userAuth/userAuth';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import {
  CognitoIdentityProviderServiceException,
  ConfirmSignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { type IInviteData, type ILoginData, type IUserRegisterData } from 'entities/User';
import { jwtDecode } from 'jwt-decode';
import tokenNormalize from 'shared/lib/tokenNormalize/tokenNormalize';
import type { IConfirmEmail, IConfirmResetPass, IIDToken, ILoggedUser } from '../../types/auth.types';
import axiosInstance from 'shared/config/axios';

interface IAuthState {
  isLoggedIn: boolean;
  accessToken: string;
  decodedIDToken: IIDToken | null;
  idToken: string;
  refreshToken: string;
  isLoading: boolean;
  error: CognitoIdentityProviderServiceException | null;
  resetError: () => void;
  register: (credentials: IUserRegisterData) => Promise<unknown>;
  login: (values: ILoginData) => Promise<unknown>;
  confirmEmail: (data: IConfirmEmail) => Promise<ConfirmSignUpCommandOutput | undefined>;
  initResetPass: (values: { email: string }) => Promise<unknown>;
  confirmResetPass: (values: IConfirmResetPass) => Promise<unknown>;
  logout: (accessToken: string) => Promise<void>;
  decodeIDToken: (token: string) => void;
  invite: (data: IInviteData) => Promise<unknown>;
  updateTokens: (refreshToken: string) => Promise<unknown>;
  resetState: () => void;
}

const useAuth = create<IAuthState>()(
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
            await axiosInstance.post('https://api.dev.bmcrm.camp/campers/create', credentials);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        login: async values => {
          try {
            set({ isLoading: true });
            const user: ILoggedUser | undefined = await loginUser(values);

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
        logout: async accessToken => {
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
        decodeIDToken: token => {
          try {
            const decodedToken = jwtDecode<IIDToken>(token);
            const normalizedToken = tokenNormalize(decodedToken);
            set({ decodedIDToken: normalizedToken });
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          }
        },
        invite: async data => {
          try {
            set({ isLoading: true });

            return await inviteUser(data);
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          } finally {
            set({ isLoading: false });
          }
        },
        updateTokens: async refreshToken => {
          try {
            const newTokens = await refreshUserTokens(refreshToken);

            if (newTokens) {
              const decodedIDToken = jwtDecode<IIDToken>(newTokens.IdToken as string);
              const normalizedIDToken = tokenNormalize(decodedIDToken);

              set({
                accessToken: newTokens.AccessToken,
                idToken: newTokens.IdToken,
                refreshToken: newTokens.RefreshToken || refreshToken,
                decodedIDToken: normalizedIDToken,
              });
            }

            return newTokens;
          } catch (error) {
            set({ error: error as CognitoIdentityProviderServiceException });
          }
        },
        resetState: () => {
          set({
            isLoggedIn: false,
            isLoading: false,
            decodedIDToken: null,
            accessToken: '',
            idToken: '',
            refreshToken: '',
            error: null,
          });
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
