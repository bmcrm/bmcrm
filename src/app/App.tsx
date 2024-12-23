import * as Sentry from '@sentry/react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AppRouter } from '@app/providers/AppRouter';
// import { useAuth } from '@entities/User';
// import { useCampers } from '@entities/Camper';

const App = () => {
  // const { decodedIDToken, updateTokens, refreshToken, error, resetState, isLoggedIn } = useAuth();
  // const { getCampers } = useCampers();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAndRefreshToken = async () => {
  //     const now = Math.floor(Date.now() / 1000);
  //     const exp = decodedIDToken?.exp;
  //
  //     if (exp && now > exp) {
  //       updateTokens(refreshToken);
  //     }
  //   };
  //
  //   void checkAndRefreshToken();
  // }, [decodedIDToken?.exp, refreshToken, updateTokens]);

  // useEffect(() => {
  //   if (error?.name === 'NotAuthorizedException') {
  //     resetState();
  //     navigate(RoutePath.sign_in, { replace: true });
  //   }
  // }, [error?.name, navigate, resetState]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     void getCampers();
  //   }
  // }, [getCampers, isLoggedIn]);

  return (
    <div className='app'>
      <AppRouter />
    </div>
  );
};

export default Sentry.withProfiler(App);
