import { useState } from "react";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { style } from "../../core/ui/style";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchIcon } from "../../icons/SearchIcon";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ISearchProps } from "./ISearchProps";
import styles from "./Search.module.scss";

export const Search: React.FC<ISearchProps> = (props) => {
  const [query, setQuery] = useState(props.query ?? "");
  const { t } = useTranslation();
  const debounce = useDebounce();

  const onSearch = () => props.onSearch?.(query);

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debounce(() => props.onSearch?.(event.target.value), 300);
  };

  return (
    <div className={styles.search}>
      <input
        className={style(styles.input, props.inputClassName)}
        onChange={onChange}
        onKeyDown={onEnter}
        placeholder={t(texts.general.search)}
        type="text"
        value={query}
      />
      <SpinnerButton displaySpinner={props.displaySpinner ?? false}>
        <SearchIcon className={styles.icon} onClick={onSearch} />
      </SpinnerButton>
    </div>
  );
};
