import { Model, ModelStatic, WhereOptions } from "sequelize";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IEntityRepository } from "../../core/api/types/IEntityRepository";
import { IEntitySubset } from "../../core/api/types/IEntitySubset";
import { List } from "../../core/services/list/List";

export abstract class SequelizeRepository<TEntity extends IEntity>
  implements IEntityRepository<TEntity>
{
  constructor(
    protected readonly model: ModelStatic<
      Model<TEntity, IEntityDetails<TEntity>>
    >
  ) {}

  async delete(entity: TEntity): Promise<boolean> {
    return await this.deleteById(entity.id);
  }

  async deleteById(id: string): Promise<boolean> {
    const count = await this.model.destroy({
      where: { id: id } as WhereOptions<TEntity>,
    });
    return count === 1;
  }

  findAll<K extends keyof TEntity>(
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  findAll(): Promise<TEntity[]>;
  async findAll(fields?: unknown): Promise<unknown> {
    const requestedFields = this.getFields(fields);
    const data = await this.model.findAll({ attributes: requestedFields });
    return data.map((model) => model.toJSON());
  }

  findById<K extends keyof TEntity>(
    id: string,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K> | undefined>;
  findById(id: string): Promise<TEntity | undefined>;
  async findById(id: string, fields?: unknown): Promise<unknown> {
    const requestedFields = this.getFields(fields);
    const data = await this.model.findByPk(id, { attributes: requestedFields });
    return data?.toJSON();
  }

  insert<K extends keyof TEntity>(
    entity: IEntityDetails<TEntity>,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>>;
  insert(entity: IEntityDetails<TEntity>): Promise<TEntity>;
  async insert(
    entity: IEntityDetails<TEntity>,
    fields?: unknown
  ): Promise<unknown> {
    const data = await this.model.create(entity as any);
    return this.toJson(data, fields);
  }

  update<K extends keyof TEntity>(
    entity: TEntity,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>>;
  update(entity: TEntity): Promise<TEntity>;
  async update(entity: TEntity, fields?: unknown): Promise<unknown> {
    const entities = [entity];
    const requestFields = this.getKeyFields(fields);
    const updatedEntities = await this.updateAll(entities, requestFields);
    return updatedEntities[0];
  }

  updateAll<K extends keyof TEntity>(
    entities: TEntity[],
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  updateAll(entities: TEntity[]): Promise<TEntity[]>;
  async updateAll(entities: TEntity[], fields?: unknown): Promise<unknown> {
    if (List.isEmpty(entities)) {
      return [];
    }

    const entity = entities[0];
    const propNames: (keyof TEntity)[] = [];
    for (const propName in entity) {
      if (
        propName !== "id" &&
        propName !== "createdAt" &&
        propName !== "updatedAt"
      ) {
        propNames.push(propName);
      }
    }

    const data = await this.model.bulkCreate(entities as any, {
      updateOnDuplicate: propNames,
    });

    return data.map((model) => this.toJson(model, fields));
  }

  private getFields(fields?: unknown): string[] {
    if (fields && Array.isArray(fields)) {
      return fields;
    }
    return [];
  }

  private getKeyFields(fields?: unknown): (keyof TEntity)[] {
    return this.getFields(fields) as (keyof TEntity)[];
  }

  private toJson(
    data: Model<TEntity, IEntityDetails<TEntity>>,
    fields: unknown
  ): TEntity {
    const requestFields = this.getKeyFields(fields);
    if (List.isNotEmpty(requestFields)) {
      const entity = data.toJSON();
      const newEntity = {} as TEntity;
      requestFields.forEach((field) => {
        newEntity[field] = entity[field];
      });
      return newEntity;
    } else {
      return data.toJSON();
    }
  }
}
