import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@app/providers/AppRouter';
import { userState } from '@entities/User';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = userState();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
