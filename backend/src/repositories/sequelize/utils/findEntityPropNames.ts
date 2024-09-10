import { IEntity } from "../../../core/api/types/IEntity";

/**
 * Finds the prop names of an {@link entity} and excludes the technical fields id, createdAt, updatedAt.
 */
export const findEntityPropNames = <TEntity extends IEntity>(
  entity: TEntity
): (keyof TEntity)[] => {
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
  return propNames;
};
