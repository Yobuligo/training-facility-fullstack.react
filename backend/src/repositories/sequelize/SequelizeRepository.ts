import { Model, ModelStatic } from "sequelize";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IEntitySubset } from "../../core/api/types/IEntitySubset";
import { IEntityRepository } from "../core/IEntityRepository";

export abstract class SequelizeRepository<TEntity extends IEntity>
  implements IEntityRepository<TEntity>
{
  constructor(
    protected readonly model: ModelStatic<
      Model<TEntity, IEntityDetails<TEntity>>
    >
  ) {}

  deleteById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findAll<K extends keyof TEntity>(
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  findAll(): Promise<TEntity[]>;
  findAll(fields?: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  findById<K extends keyof TEntity>(
    id: string,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K> | undefined>;
  findById(id: string): Promise<TEntity | undefined>;
  findById(id: unknown, fields?: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  insert<K extends keyof TEntity>(
    entity: IEntityDetails<TEntity>,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>>;
  insert(entity: IEntityDetails<TEntity>): Promise<TEntity>;
  insert(entity: unknown, fields?: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  update<K extends keyof TEntity>(
    entity: TEntity,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>>;
  update(entity: TEntity): Promise<TEntity>;
  update(entity: unknown, fields?: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  updateAll<K extends keyof TEntity>(
    entities: TEntity[],
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  updateAll(entities: TEntity[]): Promise<TEntity[]>;
  updateAll(entities: unknown, fields?: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
