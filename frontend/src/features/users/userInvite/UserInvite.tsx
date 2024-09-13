import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { IUserInviteProps } from "./IUserInviteProps";
import styles from "./UserInvite.module.scss";
import { useUserInviteViewModel } from "./useUserInviteViewModel";

export const UserInvite: React.FC<IUserInviteProps> = (props) => {
  const viewModel = useUserInviteViewModel();
  return (
    <div className={styles.userInvite}>
      {viewModel.isVerifyUserInviteRequestProcessing ? <PageSpinner /> : <></>}
    </div>
  );
};
