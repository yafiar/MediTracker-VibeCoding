import React from 'react';
import { Navigate } from 'react-router-dom';

const RootRedirect = () => {
  const token = localStorage.getItem('token');
  
  // If logged in, redirect to dashboard, otherwise to login
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
};

export default RootRedirect;
