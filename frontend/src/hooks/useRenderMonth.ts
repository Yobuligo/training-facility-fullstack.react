import { texts } from "./useTranslation/texts";
import { useTranslation } from "./useTranslation/useTranslation";

export const useRenderMonth = () => {
  const { t } = useTranslation();

  const render = (month: number) => {
    switch (month) {
      case 1:
        return t(texts.general.month.jan);
      case 2:
        return t(texts.general.month.feb);
      case 3:
        return t(texts.general.month.mar);
      case 4:
        return t(texts.general.month.apr);
      case 5:
        return t(texts.general.month.may);
      case 6:
        return t(texts.general.month.jun);
      case 7:
        return t(texts.general.month.july);
      case 8:
        return t(texts.general.month.aug);
      case 9:
        return t(texts.general.month.sept);
      case 10:
        return t(texts.general.month.oct);
      case 11:
        return t(texts.general.month.nov);
      case 12:
        return t(texts.general.month.dec);
    }
  };

  return render;
};
