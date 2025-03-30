// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const { token } = useAuth();

  return token ? <Element {...rest} /> : <Navigate to="/unauthorized" />;

};

export default PrivateRoute;
