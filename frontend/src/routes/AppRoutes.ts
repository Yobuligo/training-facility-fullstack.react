import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  bookTrialTraining: route("/book-trial-training"),
  changePassword: route("/changePassword"),
  eventOverview: route("/training-times"),
  dashboard: route("/"),
  error: route("/error"),
  login: route("/login"),
  userInvite: route("/user-invite/:userInviteId"),
});
