import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Gender } from "../../shared/types/Gender";

/**
 * This hook is responsible for rendering a {@link Gender} to text.
 */
export const useRenderGender = () => {
  const { t } = useTranslation();

  const render = (gender: Gender): string => {
    switch (gender) {
      case Gender.FEMALE:
        return t(texts.general.female);
      case Gender.MALE:
        return t(texts.general.male);
    }
  };

  return render;
};
