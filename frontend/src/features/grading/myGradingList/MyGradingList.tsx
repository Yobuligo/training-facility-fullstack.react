import { useState } from "react";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useInitialize } from "../../../hooks/useInitialize";
import { useUser } from "../../../hooks/useUser";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { GradingList } from "../gradingList/GradingList";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { texts } from "../../../lib/translation/texts";
import styles from './MyGradingList.module.scss';

export const MyGradingList: React.FC = () => {
  const [gradings, setGradings] = useState<IUserGrading[]>([]);
  const [loadGradingRequest, isLoadGradingRequestProcessing] = useRequest();
  const [user] = useUser();
  const { t } = useTranslation();

  useInitialize(() =>
    loadGradingRequest(async () => {
      const userApi = new UserApi();
      const readUser = await userApi.findById(user.id, ["userProfile"]);
      setGradings(checkNotNull(readUser?.userProfile?.userGradings));
    })
  );

  return (
    <>
      {isLoadGradingRequestProcessing ? (
        <PageSpinner />
      ) : (
        <>
          <p className={styles.introduction}>{t(texts.myGradingList.introduction)}</p>
          <GradingList
            displayMode={true}
            isAdminMode={false}
            gradings={gradings}
            className={styles.gradingList}
          />
        </>
      )}
    </>
  );
};
