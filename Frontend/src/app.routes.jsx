import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./features/auth/auth.context";

import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Home from "./features/home/pages/Home";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);