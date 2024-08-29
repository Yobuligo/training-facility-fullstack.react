import { useEffect, useState } from "react";
import { EventRegistrationApi } from "../../api/EventRegistrationApi";
import { Spinner } from "../../components/spinner/Spinner";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useUserProfile } from "../../hooks/useUserProfile";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventRegistration } from "../../shared/model/IEventRegistration";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";

export const Welcome: React.FC = () => {
  const [userProfile] = useUserProfile();
  const { t } = useTranslation();
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);
  const eventRegistrationRequest = useRequest();

  useEffect(() => {
    eventRegistrationRequest.send(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      const eventRegistrations = await eventRegistrationApi.findByUserForWeek(
        checkNotNull(userProfile).userId
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
        {t(texts.welcome.welcome, {
          name: checkNotNull(userProfile).firstname,
        })}
      </h2>

      <p>{t(texts.welcome.explanation)}</p>
      {eventRegistrationRequest.isProcessing ? (
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
