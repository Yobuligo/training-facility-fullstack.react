import { useEffect, useState } from "react";
import { EventRegistrationApi } from "../../api/EventRegistrationApi";
import { Spinner } from "../../components/spinner/Spinner";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventRegistration } from "../../shared/model/IEventRegistration";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";

export const Welcome: React.FC = () => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);
  const [eventRegistrationRequest, isEventRegistrationRequestProcessing] =
    useRequest();

  useEffect(() => {
    eventRegistrationRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      const eventRegistrations = await eventRegistrationApi.findByUserForWeek(
        user.id
      );
      setEventRegistrations(eventRegistrations);
    });
  }, []);

  const eventInstances = eventRegistrations
    .map((eventRegistration) => checkNotNull(eventRegistration.eventInstance))
    .sort((left, right) =>
      DateTime.compare(checkNotNull(left).from, checkNotNull(right).from)
    );

  return (
    <div>
      <h2>
        {t(texts.welcome.welcome, {
          name: user.userProfile.firstname,
        })}
      </h2>

      <p>{t(texts.welcome.explanation)}</p>
      {isEventRegistrationRequestProcessing ? (
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
