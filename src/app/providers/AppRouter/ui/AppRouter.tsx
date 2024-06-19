import { memo, Suspense, useCallback } from 'react';
import { AppRouterProps, routeConfig } from '../config/routeConfig';
import PageLoader from 'features/PageLoader';
import RequireAuth from './RequireAuth';
import Header from 'widgets/Header';
import { Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);
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

  return <SentryRoutes>{Object.values(routeConfig).map(renderWithWrapper)}</SentryRoutes>;
});

export default AppRouter;
