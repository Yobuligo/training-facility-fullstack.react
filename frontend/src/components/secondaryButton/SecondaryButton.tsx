import { style } from "../../core/ui/style";
import colors from "../../styles/colors.module.scss";
import componentStyles from "../../styles/components.module.scss";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { ISecondaryButtonProps } from "./ISecondaryButtonProps";

export const SecondaryButton: React.FC<ISecondaryButtonProps> = (props) => {
  return (
    <SpinnerButton
      {...props}
      className={style(componentStyles.secondaryButton, props.className)}
      displaySpinner={props.displaySpinner ?? false}
      spinnerColor={colors.colorSecondaryButtonSpinner}
    />
  );
};
