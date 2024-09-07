import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
