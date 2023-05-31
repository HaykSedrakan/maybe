import React, {useState, useRef,useEffect} from 'react'
import { CSSTransition } from "react-transition-group";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styles from "./DropDownLanguage.module.scss";


export const DropDownCurrency = () => {

  const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  return (
    <div className={styles.dropdownCurrencyContainer} ref={dropdownRef}>
      <div
        className={styles.selectedCurrency}
        onClick={() => setIsOpen(!isOpen)}
      >
      </div>
      <CSSTransition
        in={isOpen}
        timeout={100}
        classNames={{
          enter: styles.dropdownEnter,
          enterActive: styles.dropdownEnterActive,
          exit: styles.dropdownExit,
          exitActive: styles.dropdownExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.dropdownMenu}>
          <div
            value="lang"
            className={styles.dropdownItem}
          >
            ENG
          </div>
          <div
            value="lang"
            className={styles.dropdownItem}
          >
            ARM
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
