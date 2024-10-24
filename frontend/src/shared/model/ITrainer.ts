import { IHaveId } from "../../core/api/types/IHaveId";
import { IHaveName } from "../types/IHaveName";

/**
 * This interface represents a user, that has the the role TRAINER.
 */
export interface ITrainer extends IHaveId, IHaveName {}
