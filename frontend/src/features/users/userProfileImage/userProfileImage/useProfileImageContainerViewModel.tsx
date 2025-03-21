import { useMemo, useState } from "react";
import { UserProfileApi } from "../../../../api/UserProfileApi";
import { UserProfileImageApi } from "../../../../api/UserProfileImageApi";
import { SecondaryButton } from "../../../../components/secondaryButton/SecondaryButton";
import { Event } from "../../../../core/services/event/Event";
import { error } from "../../../../core/utils/error";
import { useConfirmDialog } from "../../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";
import { useRequest } from "../../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../../services/UserInfo";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";
import { UserProfileImageCropper } from "../userProfileImageCropper/UserProfileImageCropper";
import { UserProfileImageDisplay } from "../userProfileImageDisplay/UserProfileImageDisplay";
import { IUserProfileImageProps } from "./IUserProfileImageProps";

export const useProfileImageContainerViewModel = (
  props: IUserProfileImageProps
) => {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState(
    UserInfo.findUserProfileImageBySize(
      props.size ?? UserProfileImageSize.ORIGINAL,
      props.userProfile
    )
  );
  const confirmDialog = useConfirmDialog();
  const [uploadUserProfileImageRequest] = useRequest();
  const [deleteUserProfileImageRequest] = useRequest();
  const userProfileId =
    props.userProfile?.id ??
    error("Error while retrieving user profile id. UserProfile not found.");
  const displayFullscreenDialog = useConfirmDialog();

  /**
   * Event to register a crop handler, which is responsible for cropping the selected image.
   */
  const cropImageEvent = useMemo(
    () => new Event<() => Promise<Blob | null>>(),
    []
  );

  /**
   * Event to register a handler, which is responsible for deleting the currently selected image.
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
      // Delete image. Deletion is only required if image exists
      if (imageSrc !== undefined && imageSrc !== "") {
        setImageSrc("");
        deleteUserProfileImageRequest(async () => {
          const userProfileApi = new UserProfileApi();
          await userProfileApi.deleteUserProfileImage(userProfileId);
        });
      }
    }
  };

  const onDelete = () => deleteImageEvent.notify();

  const onEdit = () =>
    confirmDialog.show(
      t(texts.profileImage.chooseImage),
      <UserProfileImageCropper
        imageSrc={imageSrc}
        onRequestCrop={(handler) => {
          cropImageEvent.clear();
          cropImageEvent.register(handler);
        }}
        onRequestDelete={(handler) => {
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

  const onClickImage = async () => {
    displayFullscreenDialog.show(
      UserInfo.toFullName(props.userProfile),
      <UserProfileImageDisplay userProfileId={userProfileId} />,
      { displayCancelButton: false }
    );
  };

  return {
    confirmDialog,
    displayFullscreenDialog,
    imageSrc,
    onEdit,
    onClickImage,
  };
};
