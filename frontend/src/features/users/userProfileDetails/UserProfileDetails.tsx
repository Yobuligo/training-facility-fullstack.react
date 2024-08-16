import { DetailView } from "../../../components/detailView/DetailView";
import { useSignal } from "../../../hooks/useSignal";
import { UserProfile } from "../userProfile/UserProfile";
import { IUserProfileDetails } from "./IUserProfileDetails";

/**
 * This component is responsible for displaying a user profile and provides an icon to navigate back.
 */
export const UserProfileDetails: React.FC<IUserProfileDetails> = (props) => {
  const [cancelSignal, triggerCancelSignal] = useSignal();

  const onBack = () => {
    triggerCancelSignal();
    props.onBack?.(props.userProfile);
  };

  return (
    <DetailView onBack={onBack}>
      <UserProfile
        cancelSignal={cancelSignal}
        isAdminMode={props.isAdminMode}
        onCancel={props.onCancel}
        onChange={props.onChange}
        userProfile={props.userProfile}
      />
    </DetailView>
  );
};
