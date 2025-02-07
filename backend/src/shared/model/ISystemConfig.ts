import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";

/**
 * This interface represents all system specific parameters, like specific URLs etc.
 */
export interface ISystemConfig extends IEntity {
  /**
   * This url refers to the WhatsApp group for general discussion.
   */
  whatsAppURLCommunity: string;

  /**
   * This url refers to the WhatsApp group for kids training.
   */
  whatsAppURLKids: string;

  /**
   * This url refers to the WhatsApp group for general news and appointments.
   */
  whatsAppURLNews: string;
}

export const SystemConfigRouteMeta: IRouteMeta = { path: "/system-configs" };
