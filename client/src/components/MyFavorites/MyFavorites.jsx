import useUser from '../../hooks/useUser'
import styles from './MyFavorites.module.scss'
import Header from '../Header/Header'
import { ImLocation } from 'react-icons/im'

export default function MyFavorites() {
  const { isAuth, user } = useUser()

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.favorites}>
          {user.favourite &&
            user?.favourite.map((item) => (
              <div className={styles.favoriteCard}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.imgContainer_img}
                    src={item?.img[0]?.jpeg}
                    alt=""
                  />
                </div>
                <div className={styles.infoContainer}>
                  <div className={styles.cardTitle}>{item?.title}</div>
                  <div className={styles.priceContainer}>
                    <p className={styles.priceContainer_price}>
                      {item?.currency} {item?.price}
                    </p>
                  </div>
                  <div className={styles.location}>
                    <ImLocation className={styles.location_icon} />
                    {item?.location}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
