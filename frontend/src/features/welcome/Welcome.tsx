import { useState } from "react";
import { EventInstanceApi } from "../../api/EventInstanceApi";
import { PageSpinner } from "../../components/pageSpinner/PageSpinner";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useInitialize } from "../../hooks/useInitialize";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventInstanceItemModel } from "../eventInstance/eventInstanceItem/IEventInstanceItemModel";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";
import styles from "./Welcome.module.scss";

export const Welcome: React.FC = () => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [eventInstanceItemModels, setEventInstanceItemModels] = useState<
    IEventInstanceItemModel[]
  >([]);
  const [loadEventInstancesRequest, isLoadEventInstancesRequestProcessing] =
    useRequest();

  useInitialize(() =>
    loadEventInstancesRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstanceItemModels: IEventInstanceItemModel[] =
        await eventInstanceApi.findByUserForWeek(user.id, [
          "color",
          "from",
          "to",
          "title",
        ]);
      eventInstanceItemModels.sort((left, right) =>
        DateTime.compare(checkNotNull(left).from, checkNotNull(right).from)
      );
      setEventInstanceItemModels(eventInstanceItemModels);
    })
  );

  return (
    <div>
      <h2 className={styles.greeting}>
        {t(texts.welcome.welcome, {
          name: user.userProfile.firstname,
        })}
      </h2>

      <p>{t(texts.welcome.explanation)}</p>
      {isLoadEventInstancesRequestProcessing ? (
        <PageSpinner />
      ) : (
        <div className={styles.upcomingTrainings}>
          {isInitial(eventInstanceItemModels) ? (
            <div>
              {t(texts.welcome.noTrainings, {
                trainings: (
                  <span className={styles.trainingsLinkInfo}>
                    {t(texts.dashboard.trainings)}
                  </span>
                ),
              })}
            </div>
          ) : (
            <>
              <p>{t(texts.welcome.weekTrainings)}</p>
              <EventInstanceList
                eventInstanceItemModels={eventInstanceItemModels}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
