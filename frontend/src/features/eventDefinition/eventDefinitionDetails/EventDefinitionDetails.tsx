import { AppointmentForm } from "../../../components/appointmentForm/AppointmentForm";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { DetailView } from "../../../components/detailView/DetailView";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { style } from "../../../core/ui/style";
import colors from "../../../styles/colors.module.scss";
import styles from "./EventDefinitionDetails.module.scss";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";
import { useEventDefinitionDetailsViewModel } from "./useEventDefinitionDetailsViewModel";

export const EventDefinitionDetails: React.FC<IEventDefinitionDetailsProps> = (
  props
) => {
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
            recurrence={viewModel.recurrence}
            setDescription={viewModel.setDescription}
            setFromDate={viewModel.setFromDate}
            setFromTime={viewModel.setFromTime}
            setRecurrence={viewModel.setRecurrence}
            setTitle={viewModel.onChangeTitle}
            setToDate={viewModel.setToDate}
            setToTime={viewModel.setToTime}
            title={viewModel.title}
            titleError={viewModel.titleError}
            toDate={viewModel.toDate}
            toTime={viewModel.toTime}
          />

          <Toolbar className={styles.buttonContainer}>
            {renderButton(colors.colorPrimaryLight, styles.button0)}
            {renderButton(colors.colorPrimary, styles.button1)}
            {renderButton(colors.colorPrimaryDark, styles.button2)}
            {renderButton(colors.colorSecondaryLight, styles.button3)}
            {renderButton(colors.colorSecondary, styles.button4)}
          </Toolbar>
        </div>
      </ChangeableForm>
    </DetailView>
  );
};
