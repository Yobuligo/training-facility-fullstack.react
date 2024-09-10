import {
  FindOptions,
  Includeable,
  IncludeOptions,
  Model,
  ModelStatic,
  WhereOptions,
} from "sequelize";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IEntityRepository } from "../../core/api/types/IEntityRepository";
import { IEntitySubset } from "../../core/api/types/IEntitySubset";
import { List } from "../../core/services/list/List";
import { findTransaction } from "./utils/findTransaction";

export abstract class SequelizeRepository<TEntity extends IEntity>
  implements IEntityRepository<TEntity>
{
  /**
   * @param model represents the sequelize model whos data should be handled
   * @param relatedModelIncludes represents the related sequelize models which should be loaded when loading an entity. Can be redefined with parameter fields of methods.
   */
  constructor(
    protected readonly model: ModelStatic<
      Model<TEntity, IEntityDetails<TEntity>>
    >,
    protected readonly relatedModelIncludes?: IncludeOptions[]
  ) {}

  async delete(entity: TEntity): Promise<boolean> {
    return await this.deleteById(entity.id);
  }

  async deleteById(id: string): Promise<boolean> {
    const count = await this.model.destroy({
      where: { id: id } as WhereOptions<TEntity>,
      transaction: findTransaction(),
    });
    return count === 1;
  }

  findAll<K extends keyof TEntity>(
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  findAll(): Promise<TEntity[]>;
  async findAll(fields?: unknown): Promise<unknown> {
    const options = this.toOptions(fields);
    const data = await this.model.findAll(options);
    return data.map((model) => model.toJSON());
  }

  findById<K extends keyof TEntity>(
    id: string,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K> | undefined>;
  findById(id: string): Promise<TEntity | undefined>;
  async findById(id: string, fields?: unknown): Promise<unknown> {
    const options = this.toOptions(fields);
    const data = await this.model.findByPk(id, options);
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
    const data = await this.model.create(entity as any, {
      transaction: findTransaction(),
    });
    return this.toJson(data, fields);
  }

  async update(entity: TEntity): Promise<boolean> {
    const [updatedRows] = await this.model.update(entity, {
      where: { id: entity.id } as WhereOptions,
      transaction: findTransaction(),
    });
    return updatedRows === 1;
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
      transaction: findTransaction(),
    });

    return data.map((model) => this.toJson(model, fields));
  }

  upsert<K extends keyof TEntity>(
    entity: TEntity,
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>>;
  upsert(entity: TEntity): Promise<TEntity>;
  async upsert(entity: unknown, fields?: unknown): Promise<unknown> {
    const result = await this.model.upsert(entity as any, {
      transaction: findTransaction(),
    });

    return this.toJson(result[0], fields);
  }

  upsertAll<K extends keyof TEntity>(
    entities: TEntity[],
    fields: K[]
  ): Promise<IEntitySubset<TEntity, K>[]>;
  upsertAll(entities: TEntity[]): Promise<TEntity[]>;
  async upsertAll(entities: TEntity[], fields?: unknown): Promise<unknown> {
    if (entities.length === 0) {
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

    const result = data.map((model) => this.toJson(model, fields));
    return result;
  }

  /**
   * Returns {@link fields} as key fields from {@link TEntity}.
   */
  protected getKeyFields<T>(fields?: unknown): (keyof T)[] {
    if (fields && Array.isArray(fields)) {
      return fields;
    }
    return [];
  }

  /**
   * Returns {@link data} as object of type {@link TEntity} by restricting fields to the given {@link fields}.
   */
  protected toJson(
    data: Model<TEntity, IEntityDetails<TEntity>>,
    fields: unknown
  ): TEntity {
    const requestFields = this.getKeyFields(fields);
    if (List.isNotEmpty(requestFields)) {
      const entity = data.toJSON();
      return this.restrictEntityFields(entity, requestFields);
    } else {
      return data.toJSON();
    }
  }

  /**
   * Creates a new instance of {@link T} and restricts the properties to the given {@link keyFields}.
   */
  protected restrictEntityFields<T>(entity: T, keyFields: (keyof T)[]): T {
    const newEntity = {} as T;
    keyFields.forEach((field) => {
      newEntity[field] = entity[field];
    });
    return newEntity;
  }

  protected restrictEntitiesFields<T>(entities: T[], fields: unknown): T[] {
    const keyFields = this.getKeyFields(fields);
    if (List.isNotEmpty(keyFields)) {
      const mappedEntities = entities.map((entity) =>
        this.restrictEntityFields(entity, keyFields)
      );
      return mappedEntities;
    }
    return entities;
  }

  /**
   * Builds an option object from the given {@link fields}. Reference types will be added as include. Scalar types will be added as attributes.
   */
  protected toOptions(
    fields?: unknown
  ): Omit<FindOptions<TEntity>, "where"> | undefined {
    let options: Omit<FindOptions<TEntity>, "where"> | undefined = {};
    options.attributes = this.getAttributes(fields);
    options.include = this.getIncludes(fields);
    return options;
  }

  /**
   * Returns the models that should be loaded with the entity depending on the given {@link fields}.
   * Returns all models if no {@link fields} where provided.
   */
  protected getIncludes(fields: unknown): Includeable[] | undefined {
    // No include available or list is empty, return false
    if (!this.relatedModelIncludes || this.relatedModelIncludes.length === 0) {
      return undefined;
    }

    // No fields provided to restrict includes, return all includes
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      return this.relatedModelIncludes;
    }

    // filter includes that are not matching the given fields
    const relatedModelIncludes = this.relatedModelIncludes.filter(
      (relatedModelInclude) => List.contains(fields, relatedModelInclude.as)
    );

    if (relatedModelIncludes.length === 0) {
      return undefined;
    }
    {
      return relatedModelIncludes;
    }
  }

  /**
   * Returns the attributes that should be loaded explicitly.
   * Excludes fields which are models
   */
  protected getAttributes(fields: unknown): string[] | undefined {
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      return undefined;
    }

    if (!this.relatedModelIncludes) {
      return fields;
    }

    const attributes = fields.filter((field) => {
      const index = this.relatedModelIncludes?.findIndex(
        (relatedModelInclude) => relatedModelInclude.as === field
      );
      return index === -1;
    });

    if (attributes.length === 0) {
      return undefined;
    } else {
      return attributes;
    }
  }
}
