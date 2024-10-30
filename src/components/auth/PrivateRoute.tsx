import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../backend/contexts/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
