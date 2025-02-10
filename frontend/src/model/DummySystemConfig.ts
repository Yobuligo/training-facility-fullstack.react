import { ISystemConfig } from "../shared/model/ISystemConfig";
import { Dummy } from "./Dummy";

export class DummySystemConfig extends Dummy implements ISystemConfig {
  whatsAppURLCommunity: string = "";
  whatsAppURLKids: string = "";
  whatsAppURLNews: string = "";
  id: string = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
