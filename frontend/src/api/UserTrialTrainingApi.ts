import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";

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

  async deleteByIdSecured(id: string, token: string): Promise<boolean> {
    return await RESTApi.delete(`${this.publicUrl}/${id}`, { token });
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IUserTrialTraining[]> {
    return await RESTApi.get(
      `${this.host}${EventInstanceRouteMeta.path}/${eventInstanceId}${this.routeMeta.path}`
    );
  }

  async findDetailsByIdSecured(
    id: string,
    token: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    return await RESTApi.get(`${this.publicUrl}/${id}`, { token });
  }

  async insertFromAttrsSecured(
    eventInstanceId: string,
    firstname: string,
    lastname: string,
    email: string,
    token: string
  ): Promise<IUserTrialTraining> {
    const useTrialTraining: IUserTrialTraining = {
      id: uuid(),
      email,
      eventInstanceId,
      firstname,
      lastname,
      state: EventRegistrationState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await RESTApi.post(`${this.publicUrl}`, useTrialTraining, { token });
  }
}
