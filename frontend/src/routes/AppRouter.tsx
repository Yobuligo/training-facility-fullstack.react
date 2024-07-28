import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter(
  [
    { path: AppRoutes.login.origin, element: <LoginPage /> },
    { path: AppRoutes.dashboard.origin, element: <DashboardPage /> },
  ],
  { basename: "/myapp" }
);
