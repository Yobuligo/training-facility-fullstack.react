import componentStyles from "../../styles/components.module.scss";
import { Button } from "../button/Button";
import { ISecondaryButtonProps } from "./ISecondaryButtonProps";

export const SecondaryButton: React.FC<ISecondaryButtonProps> = (props) => {
  return <Button {...props} className={componentStyles.secondaryButton} />;
};
