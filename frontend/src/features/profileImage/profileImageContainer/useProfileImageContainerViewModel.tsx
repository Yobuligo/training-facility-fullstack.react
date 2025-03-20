import { useMemo, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { UserProfileImageApi } from "../../../api/UserProfileImageApi";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
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
  const [imageSrc, setImageSrc] = useState(
    findOriginalUserProfileImage(props.user)
  );
  const confirmDialog = useConfirmDialog();
  const [uploadUserProfileImageRequest] = useRequest();
  const [deleteUserProfileImageRequest] = useRequest();
  const userProfileId =
    props.user.userProfile?.id ??
    error("Error while retrieving user profile id. UserProfile not found.");

  /**
   * Event to register a crop handler, which is responsible for cropping the selected image.
   */
  const cropImageEvent = useMemo(
    () => new Event<() => Promise<Blob | null>>(),
    []
  );

  /**
   * Event to register a handler, which is responsible for deleting the current image.
   */
  const deleteImageEvent = useMemo(() => new Event<VoidFunction>(), []);

  /**
   * Handles event when button okay was clicked to created a profile image from the selected and cropped image.
   */
  const onOkay = async () => {
    const blob = await cropImageEvent.handlers[0]?.();

    // Upload image
    if (blob) {
      const image = URL.createObjectURL(blob);
      setImageSrc(image);

      uploadUserProfileImageRequest(async () => {
        const userProfileImageApi = new UserProfileImageApi();
        await userProfileImageApi.insertFromBlob(userProfileId, blob);
      });
    } else {
      // Delete image
      setImageSrc("");
      deleteUserProfileImageRequest(async () => {
        const userProfileApi = new UserProfileApi();
        await userProfileApi.deleteUserProfileImage(userProfileId);
      });
    }
  };

  const onDelete = () => deleteImageEvent.notify();

  const onEdit = () => {
    confirmDialog.show(
      t(texts.profileImage.chooseImage),
      <ProfileImageCropper
        imageSrc={imageSrc}
        onCropRequest={(handler) => {
          cropImageEvent.clear();
          cropImageEvent.register(handler);
        }}
        onDeleteRequest={(handler) => {
          deleteImageEvent.clear();
          deleteImageEvent.register(handler);
        }}
      />,
      {
        onOkay,
        toolbarContent: (
          <SecondaryButton onClick={onDelete}>
            {t(texts.general.delete)}
          </SecondaryButton>
        ),
      }
    );
  };

  return {
    confirmDialog,
    imageSrc,
    onEdit,
  };
};
