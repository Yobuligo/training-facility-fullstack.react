import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { EmailService } from "../email/EmailService";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { SecretRequestRouteMeta } from "../shared/model/ISecretRequest";
import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { UserTrialTrainingRepo } from "./../repositories/UserTrialTrainingRepo";
import { Controller } from "./core/Controller";
import { SecretInterceptor } from "./core/SecretInterceptor";

export class UserTrialTrainingController extends Controller {
  constructor() {
    super();
    this.findByIdSecured();
    this.insertSecured();
  }

  private findByIdSecured() {
    this.router.get(
      `${UserTrialTrainingRouteMeta.path}/:id${SecretRequestRouteMeta.path}`,
      SecretInterceptor(async (req, res) => {
        const id = req.params.id;
        const userTrialTrainingRepo = new UserTrialTrainingRepo();
        const userTrialTrainingDetails =
          await userTrialTrainingRepo.findDetailsById(id);
        if (!userTrialTrainingDetails) {
          res
            .status(HttpStatusCode.NOT_FOUND_404)
            .send(
              createError("UserTrialTrainingDetails not found", "NotFoundError")
            );
        } else {
          res.status(HttpStatusCode.OK_200).send(userTrialTrainingDetails);
        }
      })
    );
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
