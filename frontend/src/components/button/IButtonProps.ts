import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
