import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      // Redirect if no token — optional, since you’re assuming it's there
      window.location.href = '/admin/login';
    }
  }, [adminToken]);

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminLayout;