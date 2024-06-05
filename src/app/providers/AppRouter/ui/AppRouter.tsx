import { memo, Suspense, useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppRouterProps, routeConfig, RoutePath } from '../config/routeConfig';
import PageLoader from 'features/PageLoader';
import RequireAuth from './RequireAuth';
import Header from 'widgets/Header';
import { useAuth } from 'entities/User';

const AppRouter = memo(() => {
  const { isLoggedIn } = useAuth(state => ({
    isLoggedIn: state.isLoggedIn,
  }));

  const renderWithWrapper = useCallback((route: AppRouterProps) => {
    const element = route.authOnly ? (
      <>
        <Header />
        <div className='main'>
          <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        </div>
      </>
    ) : (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    );
  }, []);

  if (!isLoggedIn) {
    <Navigate to={RoutePath.sign_in} />;
  }
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});

export default AppRouter;
