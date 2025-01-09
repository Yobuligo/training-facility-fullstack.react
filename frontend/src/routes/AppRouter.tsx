import { createBrowserRouter } from "react-router-dom";
import { BookTrialTrainingPage } from "../pages/BookTrialTrainingPage";
import { CancelTrialTrainingPage } from "../pages/CancelTrialTrainingPage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ErrorPage } from "../pages/ErrorPage";
import { EventOverviewPage } from "../pages/EventOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { UserInvitePage } from "../pages/UserInvitePage";
import { AppRoutes } from "./AppRoutes";
import { EventInstanceRegistrationPage } from "../pages/EventInstanceRegistrationPage";
import { DashboardContent } from "../features/dashboard/dashboardContent/DashboardContent";

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
    children: [{
      path: ":itemId",element: <DashboardContent />
    }]
  },
  {
    path: AppRoutes.eventInstanceRegistration.origin,
    element: <EventInstanceRegistrationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.eventOverview.origin,
    element: <EventOverviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.bookTrialTraining.origin,
    element: <BookTrialTrainingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.cancelTrialTraining.origin,
    element: <CancelTrialTrainingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.userInvite.origin,
    element: <UserInvitePage />,
    errorElement: <ErrorPage />,
  },
]);
