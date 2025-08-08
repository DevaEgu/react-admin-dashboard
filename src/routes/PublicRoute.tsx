import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface Props {
  children: ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { token } = useAuthStore();

  return !token ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default PublicRoute;