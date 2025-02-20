import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  bookTrialTraining: route("/book-trial-training"),
  cancelTrialTraining: route("/cancel-trial-training/:userTrialTrainingId"),

  eventOverview: route("/training-times"),

  changePassword: route("/changePassword"),
  eventInstanceRegistration: route("/trainings/:id/registration"),

  admin: route("/admin"),
  dashboard: route("/"),
  users: route("/users"),
  user: route("/users/:id"),
  planers: route("/planers"),
  planer: route("/planers/:id"),
  trainings: route("/trainings"),
  training: route("/trainings/:id"),
  gradings: route("/gradings"),
  profile: route("/profile"),

  error: route("/error"),
  login: route("/login"),

  userInvite: route("/user-invite/:userInviteId"),
});
