import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouter, RoutePath } from 'app/providers/AppRouter';
import { useAuth } from 'entities/User';

const App = () => {
  const { decodedIDToken, updateTokens, refreshToken, error, resetState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Sentry.captureMessage('App mounted');
    const checkAndRefreshToken = async () => {
      const now = Math.floor(Date.now() / 1000);
      const exp = decodedIDToken?.exp;

      if (exp && now > exp) {
        updateTokens(refreshToken);
      }
    };

    checkAndRefreshToken();
  }, [decodedIDToken?.exp, refreshToken, updateTokens]);

  useEffect(() => {
    if (error?.name === 'NotAuthorizedException') {
      resetState();
      navigate(RoutePath.sign_in, { replace: true });
    }
  }, [error?.name, navigate, resetState]);

  return (
    <div className='app'>
      <AppRouter />
    </div>
  );
};

export default Sentry.withProfiler(App);
