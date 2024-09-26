import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { EmailService } from "../email/EmailService";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import { UserTrialTrainingRepo } from "../repositories/UserTrialTrainingRepo";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { SecretRequestRouteMeta } from "../shared/model/ISecretRequest";
import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { Controller } from "./core/Controller";
import { SecretInterceptor } from "./core/SecretInterceptor";

export class UserTrialTrainingController extends Controller {
  constructor() {
    super();
    this.insertSecured();
  }

  private insertSecured() {
    this.router.post(
      `${UserTrialTrainingRouteMeta.path}${SecretRequestRouteMeta.path}`,
      SecretInterceptor(async (req, res) => {
        const userTrialTraining: IUserTrialTraining = req.secretRequest.data;
        const userTrialTrainingRepo = new UserTrialTrainingRepo();
        const createdUserTrialTraining = await userTrialTrainingRepo.insert(
          userTrialTraining
        );

        const eventInstanceRepo = new EventInstanceRepo();
        const eventInstance = await eventInstanceRepo.findById(
          userTrialTraining.eventInstanceId
        );

        if (!eventInstance) {
          throw new NotFoundError(
            "NotFoundError",
            "Error while finding event instance. Event instance not found."
          );
        }

        // send email
        const emailService = new EmailService();
        emailService.bookTrialTraining(
          userTrialTraining.email,
          eventInstance,
          userTrialTraining.firstname
        );

        res.status(HttpStatusCode.CREATED_201).send(createdUserTrialTraining);
      })
    );
  }
}
