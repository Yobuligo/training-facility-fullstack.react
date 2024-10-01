import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { ICalendarEvent } from "../model/ICalendarEvent";

export const useFetchEventInstance = () => {
  const [fetchEventInstanceRequest] = useRequest();

  const fetchEventInstance = async (
    calendarEvent: ICalendarEvent
  ): Promise<IEventInstance | undefined> => {
    let eventInstance: IEventInstance | undefined;
    await fetchEventInstanceRequest(async () => {
      const cachedEventInstance = EventInfo.findEventInstance(calendarEvent);
      if (cachedEventInstance) {
        eventInstance = cachedEventInstance;
      } else {
        const eventInstanceApi = new EventInstanceApi();
        eventInstance = await eventInstanceApi.insertFromEvent(calendarEvent);
        eventInstance.eventDefinitionId = calendarEvent.eventDefinition.id;
        if (!calendarEvent.eventDefinition.eventInstances) {
          calendarEvent.eventDefinition.eventInstances = [];
        }
        calendarEvent.eventDefinition.eventInstances.push(eventInstance);
      }
    });

    return eventInstance;
  };

  return fetchEventInstance;
};
