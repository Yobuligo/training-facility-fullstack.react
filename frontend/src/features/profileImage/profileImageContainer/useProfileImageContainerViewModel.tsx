import { useMemo, useState } from "react";
import { Event } from "../../../core/services/event/Event";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { ProfileImageCropper } from "../profileImageCropper/ProfileImageCropper";
import { IProfileImageContainerProps } from "./IProfileImageContainerProps";

export const useProfileImageContainerViewModel = (
  props: IProfileImageContainerProps
) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(props.image);
  const confirmDialog = useConfirmDialog();

  /**
   * Event to register a crop handler, which is responsible for cropping the selected image.
   */
  const cropEvent = useMemo(() => new Event<() => Promise<Blob | null>>(), []);

  /**
   * Handles event when button okay was clicked to created a profile image from the selected and cropped image.
   */
  const onOkay = async () => {
    // Todo
    const image = await cropEvent.handlers[0]?.();
    console.log("image was cropped");
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
