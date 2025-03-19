import React from "react";
import { AddIcon } from "../../icons/AddIcon";
import styles from "./AddDocument.module.scss";
import { IAddDocumentProps } from "./IAddDocumentProps";

export const AddDocument: React.FC<IAddDocumentProps> = (props) => {
  return (
    <button className={styles.addButton}>
      <AddIcon className={styles.icon} />
      {props.text}
    </button>
  );
};
