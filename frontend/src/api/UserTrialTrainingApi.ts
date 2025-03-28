import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";

import {
  IUserTrialTraining,
  UserTrialTrainingRouteMeta,
} from "../shared/model/IUserTrialTraining";
import { IUserTrialTrainingDetails } from "../shared/model/IUserTrialTrainingDetails";
import {
  IUserTrialTrainingRecords,
  UserTrialTrainingRecordsMeta,
} from "../shared/model/IUserTrialTrainingRecords";
import { EventRegistrationState } from "../shared/types/EventRegistrationState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserTrialTrainingApi extends EntityRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTrainingRouteMeta);
  }

  async deleteByIdSecured(id: string): Promise<boolean> {
    return await RESTApi.delete(`${this.publicUrl}/${id}`);
  }

  async findAllUserTrialTrainingRecords(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IUserTrialTrainingRecords[]> {
    return await RESTApi.get(
      `${this.host}${UserTrialTrainingRecordsMeta.path}`,
      {
        urlParams: {
          from: dateTimeSpan.from.toString(),
          to: dateTimeSpan.to.toString(),
        },
      }
    );
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IUserTrialTraining[]> {
    return await RESTApi.get(
      `${this.host}${EventInstanceRouteMeta.path}/${eventInstanceId}${this.routeMeta.path}`
    );
  }

  async findDetailsByIdSecured(
    id: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    return await RESTApi.get(`${this.publicUrl}/${id}`);
  }

  async insertFromAttrsSecured(
    eventInstanceId: string,
    firstname: string,
    lastname: string,
    email: string,
    privacyPolicyAccepted: boolean
  ): Promise<IUserTrialTraining> {
    const useTrialTraining: IUserTrialTraining = {
      id: uuid(),
      email,
      eventInstanceId,
      firstname,
      lastname,
      privacyPolicyAccepted,
      state: EventRegistrationState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await RESTApi.post(`${this.publicUrl}`, useTrialTraining);
  }
}
