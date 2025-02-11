import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Grade } from "../../shared/types/Grade";

/**
 * This hook is responsible for rendering a given {@link Grade} to a text.
 */
export const useRenderGrade = () => {
  const { t } = useTranslation();

  const render = (grade: Grade): string => {
    switch (grade) {
      case Grade.KUP9:
        return t(texts.grads.kup9);
      case Grade.KUP8:
        return t(texts.grads.kup8);
      case Grade.KUP7:
        return t(texts.grads.kup7);
      case Grade.KUP6:
        return t(texts.grads.kup6);
      case Grade.KUP5:
        return t(texts.grads.kup5);
      case Grade.KUP4:
        return t(texts.grads.kup4);
      case Grade.KUP3:
        return t(texts.grads.kup3);
      case Grade.KUP2:
        return t(texts.grads.kup2);
      case Grade.KUP1:
        return t(texts.grads.kup1);
      case Grade.DAN1:
        return t(texts.grads.dan1);
      case Grade.DAN2:
        return t(texts.grads.dan2);
      case Grade.DAN3:
        return t(texts.grads.dan3);
      case Grade.DAN4:
        return t(texts.grads.dan4);
      case Grade.DAN5:
        return t(texts.grads.dan5);
      case Grade.DAN6:
        return t(texts.grads.dan6);
      case Grade.DAN7:
        return t(texts.grads.dan7);
    }
  };

  return render;
};
