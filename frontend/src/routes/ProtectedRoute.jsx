import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ auth, loading, children }) => {
  if (auth === false || (!auth && loading === false))
    return <Navigate to="/login" />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
