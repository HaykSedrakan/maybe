import React, { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import styles from './DropDownLanguage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../../../redux/lang/langActions'
import { useTranslation } from 'react-i18next'

const DropDownLanguage = () => {
  const selectedLanguage = useSelector((state) => state.lang.lang)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLanguageChange = (language) => {
    dispatch(setLang(language))
    setIsOpen(false)
  }

  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={styles.selectedLanguage}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage}{' '}
        {isOpen ? (
          <FaAngleUp className={styles.icon} />
        ) : (
          <FaAngleDown className={styles.icon} />
        )}
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
        unmountOnExit>
        <div className={styles.dropdownMenu}>
          <div
            value="lang"
            className={`${styles.dropdownItem} ${
              selectedLanguage === 'ENG' && styles.active
            }`}
            onClick={() => {
              handleLanguageChange('ENG')
              changeLanguage('en')
            }}>
            ENG
          </div>
          <div
            value="lang"
            className={`${styles.dropdownItem} ${
              selectedLanguage === 'ARM' && styles.active
            } `}
            onClick={() => {
              handleLanguageChange('ARM')
              changeLanguage('am')
            }}>
            ARM
          </div>
          <div
            value="lang"
            className={`${styles.dropdownItem} ${
              selectedLanguage === 'RUS' && styles.active
            }`}
            onClick={() => {
              handleLanguageChange('RUS')
              changeLanguage('ru')
            }}>
            RUS
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropDownLanguage
