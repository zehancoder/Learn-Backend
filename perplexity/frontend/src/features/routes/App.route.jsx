import { createBrowserRouter } from "react-router";
import LoginForm from "../auth/pages/Login";
import SignupForm from "../auth/pages/Register";
import Dashboard from "../chat/pages/Dashboard";
import Protectected from "../auth/components/Protectected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protectected>
        <Dashboard />
      </Protectected>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <SignupForm />,
  },
]);
