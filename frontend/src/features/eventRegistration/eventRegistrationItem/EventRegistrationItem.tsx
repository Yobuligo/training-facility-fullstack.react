import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import { useEventRegistrationItemViewModel } from "./useEventRegistrationItemViewModel";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationItemViewModel(props);

  return (
    <Card className={styles.eventRegistrationItem}>
      {viewModel.confirmDialog.content}
      <div>{viewModel.fullName}</div>
      {props.eventRegistration.manuallyAdded ? (
        <Toolbar>
          <SecondaryButton onClick={viewModel.onDelete}>
            {t(texts.general.delete)}
          </SecondaryButton>
          <Button>{t(texts.eventRegistrationItem.present)}</Button>
        </Toolbar>
      ) : (
        <ToggleButtonGroup
          enableUnselectAll={true}
          items={viewModel.toggleButtonOptions}
          onChange={viewModel.onToggleButtonOptionChange}
          selected={viewModel.selectedToggleButtonOption}
        />
      )}
    </Card>
  );
};
