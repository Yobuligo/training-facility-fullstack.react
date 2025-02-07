/**
 * This interface represents all system specific parameters, like specific URLs etc.
 */
export interface ISystemConfig {
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
