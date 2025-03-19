import { useMemo, useState } from "react";
import { UserProfileImageApi } from "../../../api/UserProfileImageApi";
import { Event } from "../../../core/services/event/Event";
import { error } from "../../../core/utils/error";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUser } from "../../../shared/model/IUser";
import { UserProfileImageSize } from "../../../shared/types/UserProfileImageSize";
import { ProfileImageCropper } from "../profileImageCropper/ProfileImageCropper";
import { IProfileImageContainerProps } from "./IProfileImageContainerProps";

const findOriginalUserProfileImage = (user: IUser): string | undefined => {
  const userProfileImage = user.userProfile?.userProfileImages?.find(
    (userProfileImage) =>
      userProfileImage.size === UserProfileImageSize.ORIGINAL
  );

  return userProfileImage?.image.toString();
};

export const useProfileImageContainerViewModel = (
  props: IProfileImageContainerProps
) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(findOriginalUserProfileImage(props.user));
  const confirmDialog = useConfirmDialog();
  const [uploadUserProfileImageRequest] = useRequest();
  const userProfileId =
    props.user.userProfile?.id ??
    error("Error while retrieving user profile id. UserProfile not found.");

  /**
   * Event to register a crop handler, which is responsible for cropping the selected image.
   */
  const cropEvent = useMemo(() => new Event<() => Promise<Blob | null>>(), []);

  /**
   * Handles event when button okay was clicked to created a profile image from the selected and cropped image.
   */
  const onOkay = async () => {
    const blob = await cropEvent.handlers[0]?.();

    // Set image to display it.
    if (blob) {
      const image = URL.createObjectURL(blob);
      setImage(image);

      uploadUserProfileImageRequest(async () => {
        const userProfileImageApi = new UserProfileImageApi();
        await userProfileImageApi.insertFromBlob(userProfileId, blob);
      });
    }
  };

  const onEdit = () => {
    confirmDialog.show(
      t(texts.profileImage.chooseImage),
      <ProfileImageCropper
        onCrop={(handler) => {
          cropEvent.clear();
          cropEvent.register(handler);
        }}
      />,
      {
        onOkay,
      }
    );
  };

  return {
    confirmDialog,
    image,
    onEdit,
  };
};
