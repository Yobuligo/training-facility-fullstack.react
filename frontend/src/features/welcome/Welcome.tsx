import { useState } from "react";
import { EventInstanceApi } from "../../api/EventInstanceApi";
import { Spinner } from "../../components/spinner/Spinner";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useInitialize } from "../../hooks/useInitialize";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventInstanceShort } from "../../shared/model/IEventInstanceShort";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";

export const Welcome: React.FC = () => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [eventInstancesShort, setEventInstancesShort] = useState<
    IEventInstanceShort[]
  >([]);
  const [loadEventInstancesRequest, isLoadEventInstancesRequestProcessing] =
    useRequest();

  useInitialize(() =>
    loadEventInstancesRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstancesShort: IEventInstanceShort[] =
        await eventInstanceApi.findByUserForWeek(user.id, [
          "color",
          "from",
          "to",
          "title",
        ]);
      eventInstancesShort.sort((left, right) =>
        DateTime.compare(checkNotNull(left).from, checkNotNull(right).from)
      );
      setEventInstancesShort(eventInstancesShort);
    })
  );

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
          {isInitial(eventInstancesShort) ? (
            <p>{t(texts.welcome.noTrainings)}</p>
          ) : (
            <>
              <p>{t(texts.welcome.weekTrainings)}</p>
              <EventInstanceList eventInstancesShort={eventInstancesShort} />
            </>
          )}
        </>
      )}
    </div>
  );
};
