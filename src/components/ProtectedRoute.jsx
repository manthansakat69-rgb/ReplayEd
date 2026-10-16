import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Wrapper
 * Redirects unauthenticated visitors to /login.
 * Optionally restricts access to specific roles.
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user?.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a role is required and user has different role, redirect to their role's dashboard
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}
