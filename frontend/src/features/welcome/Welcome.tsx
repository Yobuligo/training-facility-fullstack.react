import { checkNotNull } from "../../core/utils/checkNotNull";
import { useSession } from "../../hooks/useSession";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";

export const Welcome: React.FC = () => {
  const [session] = useSession();
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        {t(texts.welcome.welcome, { name: checkNotNull(session).firstname })}
      </h2>
      <p>{t(texts.welcome.explanation)}</p>
      <p>{t(texts.welcome.noTrainings)}</p>
    </div>
  );
};
