import sequelize, { Op } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { db } from "../db/db";
import { EventInstance } from "../model/EventInstance";
import {
  relHasManyUserTrialTrainings,
  UserTrialTraining,
} from "../model/UserTrialTraining";
import { UserTrialTrainingExistsError } from "../shared/errors/UserTrialTrainingExistsError";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
import { IUserTrialTrainingDetails } from "../shared/model/IUserTrialTrainingDetails";
import { IUserTrialTrainingRecord } from "../shared/model/IUserTrialTrainingRecord";
import { IUserTrialTrainingRecords } from "../shared/model/IUserTrialTrainingRecords";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserTrialTrainingRepo extends SequelizeRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTraining);
  }

  async findDetailsById(
    id: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    const data = await UserTrialTraining.findByPk(id);
    if (data) {
      const userTrialTraining = data.toJSON() as IUserTrialTrainingDetails;
      const eventInstanceData = await EventInstance.findByPk(
        userTrialTraining.eventInstanceId
      );
      if (!eventInstanceData) {
        return undefined;
      }
      userTrialTraining.eventInstance = eventInstanceData.toJSON();
      return userTrialTraining;
    }
    return undefined;
  }

  /**
   * Select all trial trainings of a user, who have at least one trial training in the given date time span range
   */
  async findAllUserTrialTrainingRecords(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IUserTrialTrainingRecords[]> {
    const query = `
      SELECT 
        trial.*, inst.id AS inst_id, inst.from AS inst_from, inst.to AS inst_to 
      FROM \`user-trial-trainings\` AS trial
      LEFT JOIN \`event-instances\` AS inst
        ON inst.id = trial.eventInstanceId
      WHERE email IN (
          # select all trial trainings in the given date time span range
          # and return the email of the registered user
          SELECT DISTINCT trial.email FROM \`user-trial-trainings\` AS trial
          INNER JOIN \`event-instances\` AS inst
            ON inst.id = trial.eventInstanceId
          WHERE inst.\`from\` >= CAST(:from AS DATETIME)
            AND inst.\`to\` <= CAST(:to AS DATETIME)
        )
      ORDER BY inst.from DESC
    `;

    const data = await db.query<
      IUserTrialTraining & { inst_id: string; inst_from: Date; inst_to: Date }
    >(query, {
      replacements: { from: dateTimeSpan.from, to: dateTimeSpan.to },
      type: sequelize.QueryTypes.SELECT,
    });

    return this.convertToUserTrialTrainingRecords(data);
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IUserTrialTraining[]> {
    const data = await UserTrialTraining.findAll({
      where: { eventInstanceId },
    });
    return data.map((model) => model.toJSON());
  }

  insert<K extends keyof IUserTrialTraining>(
    entity: IEntityDetails<IUserTrialTraining>,
    fields: K[]
  ): Promise<IEntitySubset<IUserTrialTraining, K>>;
  insert(
    entity: IEntityDetails<IUserTrialTraining>
  ): Promise<IUserTrialTraining>;
  async insert(
    entity: IEntityDetails<IUserTrialTraining>,
    fields?: unknown
  ): Promise<unknown> {
    // check if a trial training already exists for the given email
    // Therefore find most recent event instance, which is referenced by a trial training in the future, for the given email
    const nowUTC = new Date().toISOString();
    const data = await EventInstance.findOne({
      order: [["from", "DESC"]], // find most recent event instance
      include: [
        {
          model: UserTrialTraining,
          as: relHasManyUserTrialTrainings,
          required: true,
          where: { email: entity.email }, // which is referenced by a trial training of the given email
        },
      ],
      where: { from: { [Op.gt]: nowUTC } }, // in the future
    });

    if (data) {
      throw new UserTrialTrainingExistsError();
    }

    const createdData = await UserTrialTraining.create(entity);
    return this.toJson(createdData, fields);
  }

  private convertToUserTrialTrainingRecords(
    data: (IUserTrialTraining & {
      inst_id: string;
      inst_from: Date;
      inst_to: Date;
    })[]
  ): IUserTrialTrainingRecords[] {
    // create hash map for fasting grouping
    const results: Map<string, IUserTrialTrainingRecords> = new Map();

    data.forEach((row) => {
      // create new user trial training record
      const userTrialTrainingRecord: IUserTrialTrainingRecord = {
        id: row.id,
        state: row.state,
        eventInstanceId: row.inst_id,
        from: row.inst_from,
        to: row.inst_to,
      };

      // assign to user with key email
      const userTrialTrainingRecords = results.get(row.email);

      if (userTrialTrainingRecords) {
        userTrialTrainingRecords.userTrialTrainingRecords.push(
          userTrialTrainingRecord
        );
      } else {
        results.set(row.email, {
          email: row.email,
          firstname: row.firstname,
          lastname: row.lastname,
          userTrialTrainingRecords: [userTrialTrainingRecord],
        });
      }
    });

    const userTrialTrainingRecordsList: IUserTrialTrainingRecords[] = [];
    results.forEach((userTrialTrainingRecords) =>
      userTrialTrainingRecordsList.push(userTrialTrainingRecords)
    );
    return userTrialTrainingRecordsList;
  }
}
