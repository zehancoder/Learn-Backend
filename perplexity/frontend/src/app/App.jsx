import { useEffect } from "react";
import { router } from "../features/routes/App.route";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "../features/auth/hook/useAuth";
function App() {
  const auth = useAuth();
  // get-me user
  useEffect(() => {
    auth.handleGetMe();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
