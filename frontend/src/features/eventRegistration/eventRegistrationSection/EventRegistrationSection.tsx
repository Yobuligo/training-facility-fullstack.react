import styles from "./EventRegistrationSection.module.scss";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { useEventRegistrationSectionViewModel } from "./useEventRegistrationSectionViewModel";

export const EventRegistrationSection: React.FC<
  IEventRegistrationSectionProps
> = (props) => {
  const viewModel = useEventRegistrationSectionViewModel(props);

  return <div className={styles.eventRegistrationSection}></div>;
};
