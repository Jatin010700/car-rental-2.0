// PrivateRoute.js
import React from 'react';
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const { token } = useAuth();

  return token ? <Element {...rest} /> : <Navigate to="/unauthorized" />;

};

export default PrivateRoute;
