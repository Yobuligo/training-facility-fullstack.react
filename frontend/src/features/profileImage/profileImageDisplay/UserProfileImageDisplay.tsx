import { useState } from "react";
import { UserProfileImageApi } from "../../../api/UserProfileImageApi";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserProfileImageSize } from "../../../shared/types/UserProfileImageSize";
import { IUserProfileImageDisplayProps } from "./IUserProfileImageDisplayProps";
import styles from "./UserProfileImageDisplay.module.scss";

export const UserProfileImageDisplay: React.FC<
  IUserProfileImageDisplayProps
> = (props) => {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState("");
  const [loadImageRequest, isLoadImageRequestProcessing] = useRequest();

  useInitialize(() =>
    loadImageRequest(async () => {
      const userProfileImageApi = new UserProfileImageApi();
      const userProfileImages = await userProfileImageApi.findByUserProfileId(
        props.userProfileId
      );

      const userProfileImage = userProfileImages.find(
        (userProfileImage) =>
          userProfileImage.size === UserProfileImageSize.ORIGINAL
      );
      if (userProfileImage) {
        setImageSrc(userProfileImage.image.toString());
      }
    })
  );

  return (
    <div>
      {isLoadImageRequestProcessing ? (
        <PageSpinner />
      ) : (
        <img
          className={styles.userProfileImageDisplay}
          src={imageSrc}
          alt={t(texts.profileImage.profileImage)}
        />
      )}
    </div>
  );
};
