import { AppConfig } from "../AppConfig";
import {
  ISecretRequest,
  SecretRequestRouteMeta,
} from "../shared/model/ISecretRequest";
import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { IUserTrialTrainingDetails } from "../shared/model/IUserTrialTrainingDetails";
import { EventRegistrationState } from "../shared/types/EventRegistrationState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserTrialTrainingApi extends EntityRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTrainingRouteMeta);
  }

  async findDetailsByIdSecured(
    id: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    const secretRequest: ISecretRequest<undefined> = {
      data: undefined,
      sharedKey: AppConfig.sharedKey,
    };
    return await RESTApi.post(
      `${this.url}/${id}${SecretRequestRouteMeta.path}`,
      secretRequest
    );
  }

  async insertFromAttrsSecured(
    eventInstanceId: string,
    firstname: string,
    lastname: string,
    email: string
  ): Promise<IUserTrialTraining> {
    const secretRequest: ISecretRequest<IUserTrialTraining> = {
      data: {
        id: uuid(),
        email,
        eventInstanceId,
        firstname,
        lastname,
        state: EventRegistrationState.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      sharedKey: AppConfig.sharedKey,
    };
    return await RESTApi.post(
      `${this.url}${SecretRequestRouteMeta.path}`,
      secretRequest
    );
  }
}
