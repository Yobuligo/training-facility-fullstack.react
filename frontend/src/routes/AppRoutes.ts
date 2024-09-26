import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  changePassword: route("/changePassword"),
  eventOverview: route("/training-times"),
  dashboard: route("/"),
  error: route("/error"),
  login: route("/login"),
  bookTrialTraining: route("/book-trial-training"),
  userInvite: route("/user-invite/:userInviteId"),
});
