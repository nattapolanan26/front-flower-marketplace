import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layouts";
// import EmailVerificationPage from '../pages/emailverification.page';
import HomePage from "@/pages/home.page";
import LoginPage from "@/pages/login.page";
// import ProfilePage from '../pages/profile.page';
import RequireUser from "@/components/requireUser";
import RegisterPage from "@/pages/register.page";
import StorePage from "@/pages/store.page";
import UnauthorizePage from "@/pages/unauthorize.page";

const authRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    { 
      path: "login",
      element: <LoginPage />
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    // {
    //   path: 'verifyemail',
    //   element: <EmailVerificationPage />,
    //   children: [
    //     {
    //       path: ':verificationCode',
    //       element: <EmailVerificationPage />,
    //     },
    //   ],
    // },
  ],
};

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "store",
          element: <StorePage />,
        },
      ],
    },
    {
      path: "unauthorized",
      element: <UnauthorizePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
