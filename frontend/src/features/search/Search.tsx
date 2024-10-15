import { useRef, useState } from "react";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { style } from "../../core/ui/style";
import { useDebounce } from "../../hooks/useDebounce";
import { CloseIcon } from "../../icons/CloseIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ISearchProps } from "./ISearchProps";
import styles from "./Search.module.scss";

export const Search: React.FC<ISearchProps> = (props) => {
  const [query, setQuery] = useState(props.query ?? "");
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useDebounce();

  const onSearch = () => props.onSearch?.(query);

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const updateValue = (newValue: string) => {
    setQuery(newValue);
    if (props.searchImplicit === true) {
      debounce(() => props.onSearch?.(newValue), 300);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateValue(event.target.value);

  const onClear = () => {
    updateValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={style(styles.search, props.className)}>
      <div className={styles.inputContainer}>
        <input
          className={style(styles.input, props.inputClassName)}
          onChange={onChange}
          onKeyDown={onEnter}
          placeholder={t(texts.general.search)}
          ref={inputRef}
          type="text"
          value={query}
        />
        <CloseIcon className={styles.closeIcon} onClick={onClear} />
      </div>
      <SpinnerButton displaySpinner={props.displaySpinner ?? false}>
        <SearchIcon className={styles.icon} onClick={onSearch} />
      </SpinnerButton>
    </div>
  );
};
