import { useEffect, useState } from "react";
import { EventInstanceApi } from "../../api/EventInstanceApi";
import { Spinner } from "../../components/spinner/Spinner";
import { isInitial } from "../../core/utils/isInitial";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventInstance } from "../../shared/model/IEventInstance";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";

export const Welcome: React.FC = () => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [eventInstances, setEventInstances] = useState<IEventInstance[]>([]);
  const [loadEventInstancesRequest, isLoadEventInstancesRequestProcessing] =
    useRequest();

  useEffect(() => {
    loadEventInstancesRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstances = await eventInstanceApi.findByUserForWeek(user.id);
      setEventInstances(eventInstances);
    });
  }, []);

  return (
    <div>
      <h2>
        {t(texts.welcome.welcome, {
          name: user.userProfile.firstname,
        })}
      </h2>

      <p>{t(texts.welcome.explanation)}</p>
      {isLoadEventInstancesRequestProcessing ? (
        <Spinner />
      ) : (
        <>
          {isInitial(eventInstances) ? (
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
