import { Model, ModelStatic, Op, WhereOptions } from "sequelize";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IEntitySubset } from "../../core/api/types/IEntitySubset";
import { NotSupportedError } from "../../core/errors/NotSupportedError";
import { List } from "../../core/services/list/List";
import { findEntityPropNames } from "./utils/findEntityPropNames";
import { findTransaction } from "./utils/findTransaction";

export class SequelizeSynchronizer<TEntity extends IEntity> {
  constructor(
    private model: ModelStatic<Model<TEntity, IEntityDetails<TEntity>>>
  ) {}

  async synchronize(
    entities: TEntity[],
    where: WhereOptions
  ): Promise<TEntity[]> {
    // this requires to read all existing entities by where
    const data = await this.model.findAll({ where: where });
    const selectedEntities = data.map((model) => model.toJSON());

    // entities which have not to be inserted, have to be updated, cache them in updateEntities
    const updateEntities: TEntity[] = [];

    // find entities, which are not persisted yet
    const insertEntities = entities.filter((entity) => {
      const index = selectedEntities.findIndex(
        (selectedEntity) => selectedEntity.id === entity.id
      );

      // if entity is already persisted, we have to update it
      if (index !== -1) {
        updateEntities.push(entity);
      }
      return index === -1;
    });

    // find entities, which have to be deleted
    const deleteEntities = selectedEntities.filter((selectedEntity) => {
      const index = entities.findIndex(
        (entity) => entity.id === selectedEntity.id
      );
      return index === -1;
    });

    //
    const synchronizedEntities: TEntity[] = [];
    const insertedEntities = await this.insertEntities(insertEntities);
    const updatedEntities = await this.updateEntities(updateEntities);
    await this.deleteEntities(deleteEntities);
    synchronizedEntities.push(...insertedEntities, ...updatedEntities);
    return synchronizedEntities;
  }

  private async insertEntities(entities: TEntity[]): Promise<TEntity[]> {
    if (List.isEmpty(entities)) {
      return [];
    }

    const createdEntities: TEntity[] = [];
    for (const entity of entities) {
      const data = await this.model.create(entity as any, {
        transaction: findTransaction(),
      });
      const createdEntity = data.toJSON();
      createdEntities.push(createdEntity);
    }
    return createdEntities;
  }

  private async updateEntities(entities: TEntity[]): Promise<TEntity[]> {
    if (List.isEmpty(entities)) {
      return [];
    }

    const entityPropNames = findEntityPropNames(entities[0]);
    if (List.isEmpty(entityPropNames)) {
      throw new NotSupportedError();
    }

    for (const entity of entities) {
      const updateObject = this.createUpdateObject(entity, entityPropNames);
      await this.model.update(updateObject, {
        where: { id: entity.id } as WhereOptions,
        transaction: findTransaction(),
      });
    }
    return entities;
  }

  private async deleteEntities(entities: TEntity[]): Promise<void> {
    if (List.isEmpty(entities)) {
      return;
    }

    await this.model.destroy({
      where: {
        id: {
          [Op.in]: entities.map((entity) => entity.id),
        },
      } as WhereOptions,
      transaction: findTransaction(),
    });
  }

  private createUpdateObject<K extends keyof TEntity>(
    entity: TEntity,
    entityPropNames: K[]
  ): IEntitySubset<TEntity, K> {
    const updateObject: any = {};
    entityPropNames.forEach((entityPropName) => {
      updateObject[entityPropName] = entity[entityPropName];
    });
    return updateObject;
  }
}
