import { useState } from "react";
import { Button } from "../../components/button/Button";
import { SearchIcon } from "../../icons/SearchIcon";
import { style } from "../../utils/style";
import { ISearchProps } from "./ISearchProps";
import styles from "./Search.module.scss";

export const Search: React.FC<ISearchProps> = (props) => {
  const [query, setQuery] = useState(props.query ?? "");

  const onSearch = () => props.onSearch?.(query);

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  return (
    <div className={styles.search}>
      <input
        className={style(styles.input, props.inputClassName)}
        onChange={onChange}
        onKeyDown={onEnter}
        placeholder="Search"
        type="text"
        value={query}
      />
      <Button>
        <SearchIcon className={styles.icon} onClick={onSearch} />
      </Button>
    </div>
  );
};
