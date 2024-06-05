import { loginUser } from 'shared/api/cognito';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
interface AuthState {
  isLoggedIn: boolean;
  login: (values: { email: string; password: string }) => void;
  accessToken: string;
  idToken: string;
  refreshToken: string;
}
export interface IResponse {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

const useAuthStore = create<AuthState>()(
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
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useAuthStore;
