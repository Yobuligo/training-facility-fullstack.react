import { IEntity } from "../../shared/types/IEntity";
import { Repository } from "./Repository";

export abstract class EntityRepository<
  TEntity extends IEntity
> extends Repository<TEntity> {
  async delete(entity: TEntity): Promise<boolean> {
    return await this.deleteById(entity.id);
  }
}
