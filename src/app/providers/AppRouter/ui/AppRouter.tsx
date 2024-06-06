import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouterProps, routeConfig } from '../config/routeConfig';
import PageLoader from 'features/PageLoader';
import RequireAuth from './RequireAuth';
import Header from 'widgets/Header';

const AppRouter = memo(() => {
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

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});

export default AppRouter;
