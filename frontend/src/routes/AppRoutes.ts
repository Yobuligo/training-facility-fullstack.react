import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  bookTrialTraining: route("/book-trial-training"),
  cancelTrialTraining: route("/cancel-trial-training/:userTrialTrainingId"),
  changePassword: route("/changePassword"),
  eventOverview: route("/training-times"),
  dashboard: route("/"),
  error: route("/error"),
  login: route("/login"),
  userInvite: route("/user-invite/:userInviteId"),
});
