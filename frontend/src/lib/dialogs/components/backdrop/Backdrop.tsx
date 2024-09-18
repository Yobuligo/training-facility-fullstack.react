import React from "react";
import { createPortal } from "react-dom";
import styles from "./Backdrop.module.scss";
import { IBackdropProps } from "./IBackdropProps";

export const Backdrop: React.FC<IBackdropProps> = (props) => {
  return createPortal(
    <div className={styles.backdrop}>{props.children}</div>,
    document.getElementById("backdrop")!
  );
};
