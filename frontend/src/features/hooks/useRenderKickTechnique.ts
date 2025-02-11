import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { KickTechnique } from "./../../shared/types/KickTechnique";

export const useRenderKickTechnique = () => {
  const { t } = useTranslation();

  const render = (kickTechnique: KickTechnique): string => {
    switch (kickTechnique) {
      case KickTechnique.NOT_RELEVANT:
        return t(texts.kickTechnique.notSpecified);
      case KickTechnique.AP:
        return t(texts.kickTechnique.apChagi);
      case KickTechnique.DOLLYO:
        return t(texts.kickTechnique.dollyochagi);
      case KickTechnique.PANDAE:
        return t(texts.kickTechnique.pandaeChagi);
      case KickTechnique.BITURO:
        return t(texts.kickTechnique.bituroChagi);
      case KickTechnique.YOP:
        return t(texts.kickTechnique.yopChagi);
      case KickTechnique.NAERYO:
        return t(texts.kickTechnique.naeryoChagi);
      case KickTechnique.DYT:
        return t(texts.kickTechnique.dytChagi);
      default:
        return t(texts.kickTechnique.notSpecified);
    }
  };

  return render;
};
