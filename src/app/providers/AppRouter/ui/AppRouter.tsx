import { memo, ReactNode, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { AppRouterProps, routeConfig, RoutePath } from '../config/routeConfig';
import RequireAuth from './RequireAuth';
import PageLoader from 'features/PageLoader';
import Header from 'widgets/Header';
import { SettingsAccount, SettingsCamp, SettingsPage } from 'pages/SettingsPage';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <div className='main'>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </div>
  </>
);

const NonAuthLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouterProps) => {
    const element = route.authOnly ? (
      <RequireAuth>
        <AuthLayout>
          {route.element}
        </AuthLayout>
      </RequireAuth>
    ) : (
      <NonAuthLayout>
        {route.element}
      </NonAuthLayout>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <SentryRoutes>
      {Object.values(routeConfig).map(renderWithWrapper)}
      <Route path={RoutePath.settings} element={(
        <RequireAuth>
          <AuthLayout>
            <SettingsPage />
          </AuthLayout>
        </RequireAuth>
      )}>
        <Route path={RoutePath.settings_account} element={(
          <Suspense fallback={<PageLoader />}>
            <SettingsAccount />
          </Suspense>
        )} />
        <Route path={RoutePath.settings_camp} element={(
          <Suspense fallback={<PageLoader />}>
            <SettingsCamp />
          </Suspense>
        )} />
      </Route>
    </SentryRoutes>
  );
});

export default AppRouter;

