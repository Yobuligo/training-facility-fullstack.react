import { ReactComponent as BurgerMenuIcon } from "../../assets/burger_menu.svg";
import { style } from "../../core/ui/style";
import { useToggle } from "../../hooks/useToggle";
import styles from "./BurgerMenu.module.scss";
import { IBurgerMenuProps } from "./IBurgerMenuProps";

export const BurgerMenu: React.FC<IBurgerMenuProps> = (props) => {
  const [isOpen, toggleIsOpen] = useToggle();

  const menuEntries = (
    <div
      style={{ top: props.topPosition }}
      className={style(styles.menuEntries, isOpen ? styles.openMenu : "")}
    >
      {props.items.map((item, index) => (
        <div
          className={styles.menuEntry}
          key={index}
          onClick={() => {
            props.onEntrySelect?.(index);
            toggleIsOpen();
          }}
        >
          <div className={styles.line}>
            {item.icon}
            <div>{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className={style(styles.burgerMenu, props.className)}>
      <BurgerMenuIcon
        className={styles.buttonIcon}
        onClick={() => toggleIsOpen()}
      />
      {isOpen && (
        <div className={styles.backdrop} onClick={() => toggleIsOpen(false)} />
      )}
      {menuEntries}
    </div>
  );
};
