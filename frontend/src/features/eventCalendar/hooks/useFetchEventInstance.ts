import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IEvent } from "../model/IEvent";

export const useFetchEventInstance = () => {
  const [fetchEventInstanceRequest] = useRequest();

  const fetchEventInstance = async (event: IEvent): Promise<IEventInstance> => {
    let eventInstance: IEventInstance;
    await fetchEventInstanceRequest(async () => {
      const cachedEventInstance = EventInfo.findEventInstance(event);
      if (cachedEventInstance) {
        eventInstance = cachedEventInstance;
      } else {
        const eventInstanceApi = new EventInstanceApi();
        eventInstance = await eventInstanceApi.insertFromEvent(event);
        eventInstance.eventDefinitionId = event.eventDefinition.id;
        if (!event.eventDefinition.eventInstances) {
          event.eventDefinition.eventInstances = [];
        }
        event.eventDefinition.eventInstances.push(eventInstance);
      }
    });

    return eventInstance!;
  };

  return fetchEventInstance;
};
