import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { UserTrialTrainingRepo } from "../repositories/UserTrialTrainingRepo";
import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { Controller } from "./core/Controller";
import { SecretInterceptor } from "./core/SecretInterceptor";

export class UserTrialTrainingController extends Controller {
  constructor() {
    super();
    this.insert();
  }

  private insert() {
    this.router.post(
      `${UserTrialTrainingRouteMeta.path}`,
      SecretInterceptor(async (req, res) => {
        const userTrialTraining: IUserTrialTraining = req.secretRequest.data;
        const userTrialTrainingRepo = new UserTrialTrainingRepo();
        const createdUserTrialTraining = await userTrialTrainingRepo.insert(
          userTrialTraining
        );
        res.status(HttpStatusCode.CREATED_201).send(createdUserTrialTraining);
      })
    );
  }
}
