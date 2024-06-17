import { type ReactNode } from 'react';
import { useAuth } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.sign_in} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
