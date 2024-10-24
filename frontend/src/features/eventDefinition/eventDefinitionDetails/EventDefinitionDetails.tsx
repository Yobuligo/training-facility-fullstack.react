import { AppointmentForm } from "../../../components/appointmentForm/AppointmentForm";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { DetailView } from "../../../components/detailView/DetailView";
import { MultiSelectSection } from "../../../components/multiSelect/multiSelectSection/MultiSelectSection";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import colors from "../../../styles/colors.module.scss";
import styles from "./EventDefinitionDetails.module.scss";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";
import { useEventDefinitionDetailsViewModel } from "./useEventDefinitionDetailsViewModel";

/**
 * This component is responsible for displaying and changing an event definition.
 */
export const EventDefinitionDetails: React.FC<IEventDefinitionDetailsProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useEventDefinitionDetailsViewModel(props);

  const renderButton = (color: string, className: string) => {
    return (
      <button
        className={style(
          className,
          viewModel.selectedColor === color ? styles.selectedButton : ""
        )}
        onClick={() => viewModel.onSelectColor(color)}
      />
    );
  };

  return (
    <DetailView onBack={props.onBack}>
      <ChangeableForm
        displayDelete={true}
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onDelete={viewModel.onDelete}
        onSave={viewModel.onSave}
        onValidate={viewModel.onValidate}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <div className={styles.eventDefinitionDetails}>
          <AppointmentForm
            description={viewModel.description}
            descriptionIsOptional={true}
            disabled={viewModel.displayMode}
            fromDate={viewModel.fromDate}
            fromTime={viewModel.fromTime}
            isMemberOnly={viewModel.isMemberOnly}
            recurrence={viewModel.recurrence}
            setDescription={viewModel.setDescription}
            setFromDate={viewModel.setFromDate}
            setFromTime={viewModel.setFromTime}
            setIsMemberOnly={viewModel.setIsMemberOnly}
            setRecurrence={viewModel.setRecurrence}
            setTitle={viewModel.onChangeTitle}
            setToDate={viewModel.setToDate}
            setToTime={viewModel.setToTime}
            title={viewModel.title}
            titleError={viewModel.titleError}
            toDate={viewModel.toDate}
            toTime={viewModel.toTime}
          />

          <MultiSelectSection
            className={styles.multiSelectSection}
            disabled={viewModel.displayMode}
            label={t(texts.general.trainers)}
            options={viewModel.trainerSelectOptions}
            onChange={viewModel.onSelectedTrainerIdsChange}
            selected={viewModel.selectedTrainerIds}
          />

          <Toolbar className={styles.buttonContainer}>
            {renderButton(colors.colorEventDefinition0, styles.button0)}
            {renderButton(colors.colorEventDefinition1, styles.button1)}
            {renderButton(colors.colorEventDefinition2, styles.button2)}
            {renderButton(colors.colorEventDefinition3, styles.button3)}
            {renderButton(colors.colorEventDefinition4, styles.button4)}
          </Toolbar>
        </div>
      </ChangeableForm>
    </DetailView>
  );
};
