import { createBrowserRouter } from "react-router-dom";

import Login from "@/views/auth/login.tsx";
import Reg from "@/views/auth/reg.tsx";
import Root from "@/views/root.tsx";
import AuthLayout from "@/views/auth/auth-layout";

const route = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/reg",
    element: (
      <AuthLayout>
        <Reg />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: <Root />,
  },
]);

export default route;
