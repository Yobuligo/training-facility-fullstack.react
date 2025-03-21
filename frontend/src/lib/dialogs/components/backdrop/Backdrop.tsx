import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Backdrop.module.scss";
import { IBackdropProps } from "./IBackdropProps";

export const Backdrop: React.FC<IBackdropProps> = (props) => {
  // Prevent body from scrolling if dialog is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className={styles.backdrop}>{props.children}</div>,
    document.getElementById("backdrop")!
  );
};
