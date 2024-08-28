import { IEntity } from "../../core/api/types/IEntity";

/**
 * Attaches {@link entity} to {@link list} if not exist.
 */
export const attach = <T extends IEntity>(list: T[], entity: T) => {
  const index = list.findIndex((item) => item.id === entity.id);
  if (index === -1) {
    list.push(entity);
  }
};
