import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthContext } from "./features/auth/auth.context";
import "./features/shared/styles/global.scss";

function AppContent() {
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      document.getElementById("loader")?.remove();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return <RouterProvider router={router} />;
}

export default AppContent;