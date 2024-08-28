import { useEffect, useState } from "react";
import { EventRegistrationApi } from "../../api/EventRegistrationApi";
import { Spinner } from "../../components/spinner/Spinner";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useRequest } from "../../hooks/useRequest";
import { useSession } from "../../lib/userSession/hooks/useSession";
import { texts } from "../../lib/useTranslation/texts";
import { useTranslation } from "../../lib/useTranslation/useTranslation";
import { IEventRegistration } from "../../shared/model/IEventRegistration";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";

export const Welcome: React.FC = () => {
  const [session] = useSession();
  const { t } = useTranslation();
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);
  const eventRegistrationRequest = useRequest();

  useEffect(() => {
    eventRegistrationRequest.send(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      const eventRegistrations = await eventRegistrationApi.findByUserForWeek(
        checkNotNull(session).userId
      );
      setEventRegistrations(eventRegistrations);
    });
  }, []);

  const eventInstances = eventRegistrations
    .map((eventRegistration) => eventRegistration.eventInstance)
    .sort((left, right) => DateTime.compare(left.from, right.from));

  return (
    <div>
      <h2>
        {t(texts.welcome.welcome, { name: checkNotNull(session).firstname })}
      </h2>

      <p>{t(texts.welcome.explanation)}</p>
      {eventRegistrationRequest.isLoading ? (
        <Spinner />
      ) : (
        <>
          {isInitial(eventRegistrations) ? (
            <p>{t(texts.welcome.noTrainings)}</p>
          ) : (
            <>
              <p>{t(texts.welcome.weekTrainings)}</p>
              <EventInstanceList eventInstances={eventInstances} />
            </>
          )}
        </>
      )}
    </div>
  );
};
