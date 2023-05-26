import React, { useEffect } from 'react'
import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    const createStar = () => {
      const right = Math.random() * 500
      const top = Math.random() * window.innerHeight
      const star = document.createElement('div')
      star.classList.add(styles.star)
      document.body.appendChild(star)
      setInterval(() => runStar(star), 10)
      star.style.top = top + 'px'
    }

    const runStar = (star) => {
      let right = parseFloat(star.style.right) || 0
      if (right >= window.innerWidth) {
        star.remove()
      }
      right += 3
      star.style.right = right + 'px'
    }

    const intervalId = setInterval(createStar, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={styles.overlay}>
      <div className={styles.text}>
        <div>ERROR</div>
        <h1 className={styles.notFoundTitle}>404</h1>
        <hr />
        <div>Page Not Found</div>
      </div>

      <div className={styles.astronaut}>
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className={styles.src}
        />
      </div>
      <div className={styles.backToHome}>
        <Link to="/" className={styles.backHome}>
          Come Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
