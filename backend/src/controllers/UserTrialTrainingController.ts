import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { EmailService } from "../email/EmailService";
import { EventInstanceRepo } from "../repositories/EventInstanceRepo";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";
import { TokenRouteMeta } from "../shared/model/IToken";
import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { UserTrialTrainingRepo } from "./../repositories/UserTrialTrainingRepo";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { TokenInterceptor } from "./core/TokenInterceptor";

export class UserTrialTrainingController extends EntityController<
  IUserTrialTraining,
  UserTrialTrainingRepo
> {
  constructor() {
    super(UserTrialTrainingRouteMeta, new UserTrialTrainingRepo());
    this.deleteByIdSecured();
    this.findByEventInstanceId();
    this.findByIdSecured();
    this.insertSecured();
  }

  private deleteByIdSecured() {
    this.router.post(
      `${UserTrialTrainingRouteMeta.path}/:id${TokenRouteMeta.path}/delete`,
      TokenInterceptor(async (req, res) => {
        const id = req.params.id;
        const userTrialTrainingRepo = new UserTrialTrainingRepo();
        const wasDeleted = await userTrialTrainingRepo.deleteById(id);
        res.status(HttpStatusCode.OK_200).send(wasDeleted);
      })
    );
  }

  private findByEventInstanceId() {
    this.router.get(
      `${EventInstanceRouteMeta.path}/:id${UserTrialTrainingRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const eventInstanceId = req.params.id;
        const userTrialTrainingRepo = new UserTrialTrainingRepo();
        const userTrialTrainings =
          await userTrialTrainingRepo.findByEventInstanceId(eventInstanceId);
        res.status(HttpStatusCode.OK_200).send(userTrialTrainings);
      })
    );
  }

  private findByIdSecured() {
    this.router.post(
      `${UserTrialTrainingRouteMeta.path}/:id${TokenRouteMeta.path}`,
      TokenInterceptor(async (req, res) => {
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
      `${UserTrialTrainingRouteMeta.path}${TokenRouteMeta.path}`,
      TokenInterceptor(async (req, res) => {
        const userTrialTraining: IUserTrialTraining = req.body;
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
        emailService.bookTrialTraining(createdUserTrialTraining, eventInstance);

        res.status(HttpStatusCode.CREATED_201).send(createdUserTrialTraining);
      })
    );
  }
}
