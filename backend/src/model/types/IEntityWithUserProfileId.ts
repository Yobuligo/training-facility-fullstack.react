import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserProfileId } from "../../shared/types/IHaveUserProfileId";

/**
 * An instance of this interface represents an entity with a user profile id.
 */
export interface IEntityWithUserProfileId extends IEntity, IHaveUserProfileId {}
