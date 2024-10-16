import { IUserGrading, UserGradingMeta } from "../shared/model/IUserGrading";
import { Repository } from "./core/Repository";

export class UserGradingApi extends Repository<IUserGrading> {
  constructor() {
    super(UserGradingMeta);
  }
}
