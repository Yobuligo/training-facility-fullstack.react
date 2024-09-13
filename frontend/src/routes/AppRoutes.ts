import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  changePassword: route("/changePassword"),
  dashboard: route("/"),
  error: route("/error"),
  login: route("/login"),
  eventOverview: route("/training-times"),
  userInvite: route("/user-invite/:userInviteId"),
});
