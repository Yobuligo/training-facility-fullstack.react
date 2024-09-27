import { SecretRequestRouteMeta } from "../shared/model/ISecretRequest";
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

  async deleteByIdSecured(id: string): Promise<boolean> {
    const secretRequest = this.createSecretRequest(undefined);
    return await RESTApi.delete(
      `${this.url}/${id}${SecretRequestRouteMeta.path}`,
      secretRequest
    );
  }

  async findDetailsByIdSecured(
    id: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    const secretRequest = this.createSecretRequest(undefined);
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
    const secretRequest = this.createSecretRequest<IUserTrialTraining>({
      id: uuid(),
      email,
      eventInstanceId,
      firstname,
      lastname,
      state: EventRegistrationState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await RESTApi.post(
      `${this.url}${SecretRequestRouteMeta.path}`,
      secretRequest
    );
  }
}
