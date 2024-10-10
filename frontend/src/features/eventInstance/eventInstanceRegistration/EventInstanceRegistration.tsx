import { useState } from "react";
import { useParams } from "react-router-dom";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
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
import { IEvent } from "../../eventCalendar/model/IEvent";
import { eventCreator } from "../../eventDefinition/eventDefinitionItem/eventCreator";
import { EventRegistrationButtonContent } from "../../eventRegistration/eventRegistrationButtonContent/EventRegistrationButtonContent";
import { EventInstanceItemAligned } from "../eventInstanceItemAligned/EventInstanceItemAligned";
import styles from "./EventInstanceRegistration.module.scss";

export const EventInstanceRegistration: React.FC = () => {
  const params = useParams<{ eventInstanceId: string }>();
  const [request] = useRequest();
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
          await new EventInstanceApi().findByEventInstanceAndUser(
            checkNotNull(params.eventInstanceId),
            user.id
          );
        const eventInstance = eventDefinition?.eventInstances?.[0];
        if (eventDefinition && eventInstance) {
          // correct date to real date
          eventDefinition.from = DateTime.toDateInstance(eventDefinition.from);
          eventDefinition.to = DateTime.toDateInstance(eventDefinition.to);
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

  return (
    <div className={styles.eventInstanceRegistration}>
      {event && eventInstance && (
        <EventInstanceItemAligned
          eventInstanceItemModel={{
            ...eventInstance,
            isMemberOnly: event.eventDefinition?.isMemberOnly,
          }}
          renderChildrenInline={true}
        >
          <EventRegistrationButtonContent
            event={event}
            isRegistered={isRegistered}
            onRegister={onReload}
            onUnregister={onReload}
            userId={user.id}
          />
        </EventInstanceItemAligned>
      )}
    </div>
  );
};
