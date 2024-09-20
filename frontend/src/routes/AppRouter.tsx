import { createBrowserRouter } from "react-router-dom";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ErrorPage } from "../pages/ErrorPage";
import { EventOverviewPage } from "../pages/EventOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { UserInvitePage } from "../pages/UserInvitePage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.error.origin, element: <ErrorPage /> },
  {
    path: AppRoutes.login.origin,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.changePassword.origin,
    element: <ChangePasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.dashboard.origin,
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.eventOverview.origin,
    element: <EventOverviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.userInvite.origin,
    element: <UserInvitePage />,
    errorElement: <ErrorPage />,
  },
]);
