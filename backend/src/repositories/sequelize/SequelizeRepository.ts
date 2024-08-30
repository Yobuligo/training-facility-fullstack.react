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
    await this.model.findByPk(id);
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

  /**
   * Converts the given {@link fields} to a string list.
   */
  protected getFields(fields?: unknown): string[] {
    if (fields && Array.isArray(fields)) {
      return fields;
    }
    return [];
  }

  /**
   * Returns {@link fields} as key fields from {@link TEntity}.
   */
  protected getKeyFields(fields?: unknown): (keyof TEntity)[] {
    return this.getFields(fields) as (keyof TEntity)[];
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
      const newEntity = {} as TEntity;
      requestFields.forEach((field) => {
        newEntity[field] = entity[field];
      });
      return newEntity;
    } else {
      return data.toJSON();
    }
  }

  /**
   * Builds an option object from the given {@link fields}. Reference types will be added as include. Scalar types will be added as attributes.
   */
  protected toOptions(
    fields?: unknown
  ): Omit<FindOptions<TEntity>, "where"> | undefined {
    let options: Omit<FindOptions<TEntity>, "where"> | undefined = {};

    const attributes = this.getAttributes(fields);
    if (List.isNotEmpty(attributes)) {
      options.attributes = attributes;
    }

    const requestedFields = this.getFields(fields);
    const includes = this.getIncludes(requestedFields);
    if (includes.length > 0) {
      options.include = includes;
    }
    return options;
  }

  /**
   * Returns the models that should be loaded with the entity depending on the given {@link fields}.
   * Returns all models if no {@link fields} where provided.
   */
  protected getIncludes(fields: string[]): Includeable[] {
    if (!this.relatedModelIncludes) {
      return [];
    }

    if (List.isEmpty(fields)) {
      return this.relatedModelIncludes;
    }

    // filter includes that are not matching the given fields
    const relatedModelIncludes = this.relatedModelIncludes.filter(
      (relatedModelInclude) => List.contains(fields, relatedModelInclude.as)
    );
    return relatedModelIncludes;
  }

  /**
   * Returns the attributes that should be loaded explicitly.
   * Excludes fields which are models
   */
  protected getAttributes(fields: unknown): string[] {
    if (!fields || !Array.isArray(fields)) {
      return [];
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

    return attributes;
  }
}
