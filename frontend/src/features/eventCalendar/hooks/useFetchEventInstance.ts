import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { IllegalStateError } from "../../../core/errors/IllegalStateError";
import { error } from "../../../core/utils/error";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IEvent } from "../model/IEvent";

/**
 * This hook is responsible for fetching an event instance for the given {@link event}.
 * This means to load the event instance either from cache, if available otherwise to create a new event instance and persist it.
 */
export const useFetchEventInstance = () => {
  const [fetchEventInstanceRequest] = useRequest();

  /**
   * This function is responsible for fetching an event instance from the given {@link event}.
   * This means to find an event instance that matches the {@link event}s start date,
   * otherwise the event instance is created.
   */
  const fetchEventInstance = async (event: IEvent): Promise<IEventInstance> => {
    let eventInstance: IEventInstance | undefined;
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

    return (
      eventInstance ??
      error(
        new IllegalStateError(
          "EventInstance was not initialized but must be not null"
        )
      )
    );
  };

  return fetchEventInstance;
};
