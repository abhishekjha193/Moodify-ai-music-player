import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Home from "./features/home/pages/Home"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // ✅ use Home
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