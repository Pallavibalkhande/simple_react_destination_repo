package src/components
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, loginPath = "/login" }) => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext is undefined. Ensure AuthProvider is wrapping the component tree.");
  }
  const { user } = context;
  if (!user) {
    return <Navigate to={loginPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;