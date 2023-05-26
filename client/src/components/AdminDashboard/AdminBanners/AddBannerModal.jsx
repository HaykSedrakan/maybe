import React, { useEffect } from 'react'
import styles from './AddBannerModal.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'

const AddBannerModal = ({ handleClose, show, children, type }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        handleClose()
      }
    }

    const handleClickOutside = (event) => {
      if (event.target.classList.contains(styles.modal)) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClose])

  return (
    <div
      className={`${styles.modal} ${
        show ? styles.displayBlock : styles.displayNone
      }`}>
      <div className={styles.modalMain}>
        <div className={styles.iconContainer}>
          <AiFillCloseCircle className={styles.icon} onClick={handleClose} />
        </div>
        {(type === 'add' && children) || (type === 'edit' && children)}
      </div>
    </div>
  )
}

export default AddBannerModal
