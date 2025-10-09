import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("adminInfo"));
  } catch {
    user = null;
  }

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminPrivateRoute;
