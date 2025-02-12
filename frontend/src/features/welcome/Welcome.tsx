import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventInstanceApi } from "../../api/EventInstanceApi";
import { PageSpinner } from "../../components/pageSpinner/PageSpinner";
import { Tooltip } from "../../components/tooltip/Tooltip";
import { DateTime } from "../../core/services/date/DateTime";
import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { isInitial } from "../../core/utils/isInitial";
import { useAuth } from "../../hooks/useAuth";
import { useInitialize } from "../../hooks/useInitialize";
import { useUser } from "../../hooks/useUser";
import { TrainerIcon } from "../../icons/TrainerIcon";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { AppRoutes } from "../../routes/AppRoutes";
import { IEventInstanceItemModelAndRole } from "../../shared/model/IEventInstanceItemModelAndRole";
import componentStyles from "../../styles/components.module.scss";
import { EventInstanceList } from "../eventInstance/eventInstanceList/EventInstanceList";
import styles from "./Welcome.module.scss";

export const Welcome: React.FC = () => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [eventInstanceItemModelAndRoles, setEventInstanceItemModelAndRoles] =
    useState<IEventInstanceItemModelAndRole[]>([]);
  const [loadEventInstancesRequest, isLoadEventInstancesRequestProcessing] =
    useRequest();
  const navigate = useNavigate();
  const auth = useAuth();

  useInitialize(() =>
    loadEventInstancesRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstanceItemModelAndRoles =
        await eventInstanceApi.findUpcomingByUserForWeek(user.id);
      eventInstanceItemModelAndRoles.sort((left, right) =>
        DateTime.compare(checkNotNull(left).from, checkNotNull(right).from)
      );
      setEventInstanceItemModelAndRoles(eventInstanceItemModelAndRoles);
    })
  );

  /**
   * This function is responsible for handling a click on an event instance item.
   * It triggers the navigation to the corresponding event instance details.
   */
  const onSelectEventInstanceItem = (
    eventInstanceItem: IEventInstanceItemModelAndRole
  ) => {
    if (auth.isAdmin()) {
      navigate(AppRoutes.training.toPath({ id: eventInstanceItem.id }));
    }
  };

  return (
    <div className={styles.welcome}>
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
          {isInitial(eventInstanceItemModelAndRoles) ? (
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
                eventInstanceItemModelAndRoles={eventInstanceItemModelAndRoles}
                onClick={onSelectEventInstanceItem}
                renderChild={(eventInstanceItemModelAndRole) =>
                  eventInstanceItemModelAndRole.isCurrentUserTrainer && (
                    <Tooltip
                      text={t(texts.welcome.infoParticipateAsTrainer)}
                      align={HorizontalAlignment.LEFT}
                    >
                      <TrainerIcon className={componentStyles.trainerIcon} />
                    </Tooltip>
                  )
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
