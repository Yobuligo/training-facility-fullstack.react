import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { EventOverviewPage } from "../pages/EventOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter(
  [
    { path: AppRoutes.login.origin, element: <LoginPage /> },
    { path: AppRoutes.dashboard.origin, element: <DashboardPage /> },
    { path: AppRoutes.eventOverview.origin, element: <EventOverviewPage /> },
  ],
  { basename: "/myapp" }
);
