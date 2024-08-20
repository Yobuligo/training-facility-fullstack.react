import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  dashboard: route("/"),
  login: route("/login"),
  eventOverview: route("/training-times"),
});
