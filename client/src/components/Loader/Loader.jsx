import { MoonLoader } from 'react-spinners'
import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <MoonLoader color="#5b0eeb" />
      </div>
    </div>
  )
}
