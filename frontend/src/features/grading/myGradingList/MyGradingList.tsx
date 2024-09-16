import { useState } from "react";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useInitialize } from "../../../hooks/useInitialize";
import { useUser } from "../../../hooks/useUser";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { GradingList } from "../gradingList/GradingList";

export const MyGradingList: React.FC = () => {
  const [gradings, setGradings] = useState<IUserGrading[]>([]);
  const [loadGradingRequest, isLoadGradingRequestProcessing] = useRequest();
  const [user] = useUser();

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
        <GradingList
          displayMode={true}
          isAdminMode={false}
          gradings={gradings}
        />
      )}
    </>
  );
};
