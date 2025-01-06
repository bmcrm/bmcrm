import { Suspense, type ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { routeConfig, type AppRouterProps } from '../config/routeConfig';
import { Header } from '@widgets/Header';
import { PageLoader } from '@features/PageLoader';
import RequireAuth from './RequireAuth';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className={'main'}>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </main>
  </>
);

const NonAuthLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const AppRouter = () => {
  const renderWithWrapper = (route: AppRouterProps) => {
    const element = route.authOnly ? (
      <RequireAuth>
        <AuthLayout>{route.element}</AuthLayout>
      </RequireAuth>
    ) : (
      <NonAuthLayout>{route.element}</NonAuthLayout>
    );

    return (
      <Route key={route.path} path={route.path} element={element}>
        {route.nested?.map(renderWithWrapper)}
      </Route>
    );
  };

  return (
    <SentryRoutes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </SentryRoutes>
  );
};

export default AppRouter;

