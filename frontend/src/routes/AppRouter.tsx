import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { AppRoutes } from "./AppRoutes";
import { StartPage } from "../pages/StartPage";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.login.origin, element: <LoginPage /> },
  { path: AppRoutes.start.origin, element: <StartPage /> },
]);
