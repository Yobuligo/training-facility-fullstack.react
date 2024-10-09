import { useState } from "react";
import { useParams } from "react-router-dom";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { DateTime } from "../../../core/services/date/DateTime";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isError } from "../../../core/utils/isError";
import { useInitialize } from "../../../hooks/useInitialize";
import { useUser } from "../../../hooks/useUser";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventFactory } from "../../../services/EventFactory";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { EventContent } from "../../eventCalendar/eventContent/EventContent";
import { IEvent } from "../../eventCalendar/model/IEvent";
import { eventCreator } from "../../eventDefinition/eventDefinitionItem/eventCreator";
import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import { EventInstanceItem } from "../eventInstanceItem/EventInstanceItem";
import styles from "./EventInstanceRegistration.module.scss";

export const EventInstanceRegistration: React.FC = () => {
  const params = useParams<{ eventInstanceId: string }>();
  const [request, isRequesting] = useRequest();
  const [eventInstance, setEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const toast = useToast();
  const { t } = useTranslation();
  const [user] = useUser();
  const [event, setEvent] = useState<IEvent | undefined>(undefined);
  const [isRegistered, setIsRegistered] = useState(false);

  const onReload = () =>
    request(
      async () => {
        const eventDefinition =
          await new EventDefinitionApi().findByEventInstanceAndUser(
            checkNotNull(params.eventInstanceId),
            user.id
          );
        const eventInstance = eventDefinition?.eventInstances?.[0];
        if (eventDefinition && eventInstance) {
          const event = EventFactory.createFromEventDefinitions(
            eventCreator,
            [eventDefinition],
            DateTime.toDateInstance(eventInstance.from),
            DateTime.toDateInstance(eventInstance.to)
          )[0];
          const isRegistered =
            EventInfo.findFirstEventRegistrationByUserId(event, user.id) !==
            undefined;

          setEvent(event);
          setEventInstance(eventInstance);
          setIsRegistered(isRegistered);
        }
      },
      (error) => {
        if (isError(error) && error.type === "NotFoundError") {
          toast.error(
            t(texts.eventInstanceRegistration.errorLoadingEventInstance)
          );
          return true;
        }
        return false;
      }
    );

  useInitialize(() => onReload());

  const onRegister = () => onReload();

  const onUnregister = () => onReload();

  return (
    <div className={styles.eventInstanceRegistration}>
      {isRequesting ? (
        <PageSpinner />
      ) : (
        <>
          {event && eventInstance && (
            <EventInstanceItem
              eventInstanceItemModel={{
                ...eventInstance,
                isMemberOnly: event.eventDefinition?.isMemberOnly,
              }}
            >
              {event.dateTimeSpan.from &&
                DateTime.isAfter(event.dateTimeSpan.from) && (
                  <EventContent>
                    <EventRegistrationButton
                      event={event}
                      isRegistered={isRegistered}
                      onRegister={onRegister}
                      onUnregister={onUnregister}
                      userId={user.id}
                    />
                  </EventContent>
                )}
            </EventInstanceItem>
          )}
        </>
      )}
    </div>
  );
};
