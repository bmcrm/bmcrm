import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { isTokenExpired } from '@shared/lib/isTokenExpired';
import { AppLayout } from '@app/layouts/AppLayout';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { useRefreshTokens, userState } from '@entities/User';

const App = () => {
  const initialCheckRef = useRef(false);
  const { resetState, isLoggedIn, tokens: { decodedIDToken, refreshToken } } = userState();
  const { clearStorage } = useLocalStorage();
  const { mutate: refreshTokens } = useRefreshTokens();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAndRefreshTokens = () => {
      if (decodedIDToken && isTokenExpired(decodedIDToken.exp)) {
        resetState();
        clearStorage();
        queryClient.clear();
      } else if (isLoggedIn && refreshToken) {
        refreshTokens(refreshToken);
      }
    };

    if (!initialCheckRef.current) {
      initialCheckRef.current = true;
      checkAndRefreshTokens();
    }
  }, [clearStorage, decodedIDToken, isLoggedIn, queryClient, refreshToken, refreshTokens, resetState]);

  return <AppLayout />;
};

export default App;