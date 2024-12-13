import { createBrowserRouter } from "react-router-dom";
import { adminAction, loginAction, logoutAction } from "../handlers/actions";
import {
  RootLoader,
  LoginLoader,
  AdminLoader,
  UserLoader,
} from "../handlers/loaders";
import Root from "../pages/root";
import Layout from "../components/Layout";
import Login from "../pages/login";
import Admin from "../pages/AdminRoutes";
import UserDashboard from "../pages/UserRoutes";

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  ADMIN: "/admin",
  USER: "/user/cv",
  ADMINCV: "/admin/cv",
};

const router = createBrowserRouter([
  {
    id: "root",
    path: ROUTES.ROOT,
    loader: RootLoader,
    Component: Layout,
    children: [
      {
        index: true,
        Component: Root,
      },
      {
        path: ROUTES.LOGIN,
        action: loginAction,
        loader: LoginLoader,
        Component: Login,
      },
      {
        path: ROUTES.ADMIN,
        action: adminAction,
        loader: AdminLoader,
        Component: Admin,
      },
      {
        path: ROUTES.USER,
        loader: UserLoader,
        Component: UserDashboard,
      },
    ],
  },
  {
    path: ROUTES.LOGOUT,
    action: logoutAction,
  },
]);

export default router;
