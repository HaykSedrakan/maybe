import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { MdLocationPin } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { HiCheck } from 'react-icons/hi'
import { FaHeart, FaCheck } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

import styles from './ProductDetails.module.css' // ...
import useUser from '../../hooks/useUser'

export default function ProductDetails() {
  const { pathname } = useLocation()
  const [product, setProduct] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [similarItems, setSimilarItems] = useState([])
  const [productUser, setUser] = useState([])
  const { isAuth, user } = useUser()

  const toggleClass = () => {
    setIsActive(!isActive)
  }

  const productId = pathname.split('/')[3]

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/productsNew`)
        const filteredProduct =
          res.data &&
          res.data
            .filter((item) => item?.id === +productId)
            .map((item) => {
              return {
                price: item.price,
                description: item.description,
                currency: item.currency,
                location: item.location,
                img: JSON.parse(item.img),
                userId: item.userId,
                id: item.id,
                title: item.title,
                type: item.type,
                category: item.category,
              }
            })
        setProduct(filteredProduct[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [productId])

  useEffect(() => {
    const fetchUser = async () => {
      if (product?.userId) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API}/users`)
          const filteredUser =
            res.data &&
            res.data
              .filter((item) => item.id == product.userId)
              .map((item) => {
                return {
                  name: item.name,
                  date: item?.date,
                  avatar: JSON.parse(item.avatar),
                  phoneNumber: item.phoneNumber,
                }
              })

          setUser(filteredUser[0])
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchUser()
  }, [product?.userId])

  useEffect(() => {
    const fetchSimilarItems = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/productsNew`)
        const filteredDatas =
          res.data &&
          res.data
            .filter((item) => item?.category === product?.category)
            .map((item) => {
              return {
                price: item.price,
                description: item.description,
                currency: item.currency,
                location: item.location,
                img: JSON.parse(item.img),
                userId: item.userId,
                id: item.id,
                title: item.title,
                type: item.type,
                category: item.category,
              }
            })
            .slice(0, 8)

        setSimilarItems(filteredDatas)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSimilarItems()
  }, [product?.category, productId])

  useEffect(() => {
    user?.favourite?.filter((item) => item.id == product.id)
  }, [productId])

  console.log(user)

  async function addFavourite(id) {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/addFavourite/user/${id}`, {
          favourite:
            product && Array.isArray(user.favourite)
              ? JSON.stringify([...user.favourite, product])
              : JSON.stringify([product]),
        })
        .then(() => console.log('Adding with favourite'))
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   window.location.reload()
  // }, [productId])

  return (
    <>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardd}>
            <div className={styles.imgDisplay}>
              <div className={styles.imgShowcase}>
                {product && product.img && product.img[0] && (
                  <img src={product.img[0].jpeg} alt="img" />
                )}
              </div>
            </div>

            <div className={styles.menu}>
              <div className={styles.purchaseInfo}>
                <div className={styles.fav} onClick={toggleClass}>
                  <FaHeart
                    className={
                      !isActive ? styles.favIcon : styles.favIconActive
                    }
                    onClick={() => addFavourite(user?.id)}
                  />
                </div>
                <div className={styles.userInfo}>
                  {/* <div className={styles.userImg}> */}
                  <img
                    className={styles.avatar}
                    src={
                      productUser &&
                      productUser.avatar &&
                      productUser?.avatar?.jpeg
                    }
                    alt="Avatar"
                  />
                  {/* <FaUserCircle className={styles.userIcon} /> */}
                  {/* </div> */}
                  <div className={styles.userName}>{productUser?.name}</div>
                  <div className={styles.since}>
                    SellSpot-ում է` {productUser?.date}
                  </div>
                </div>
                <div className={styles.btns}>
                  <a
                    // type="button"
                    href={`tel:+${productUser?.phoneNumber}`}
                    className={`${styles.btn} ${styles.btnNow}`}>
                    Contact
                  </a>
                  <button className={`${styles.btn} ${styles.btnFav}`}>
                    Favourite
                  </button> 
                </div>
              </div>
              <div className={styles.additions}>
                <div className={`${styles.toTop} ${styles.addition}`}>
                  <FaCheck className={styles.checkIcon} />
                  <p>Top</p>
                </div>
                <div className={`${styles.toHome} ${styles.addition}`}>
                  <FaCheck className={styles.checkIcon} />
                  <p>Home</p>
                </div>
                <div className={`${styles.toUrgently} ${styles.addition}`}>
                  <FaCheck className={styles.checkIcon} />
                  <p>Urgently</p>
                </div>
              </div>
              <div className={styles.samilarProductsDiv}>
                <p>Similar Adverts</p>
                <div className={styles.samilarProducts}>
                  {similarItems !== [] &&
                    similarItems.map((item) => (
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to={`/product/details/${item?.id}`}>
                        <div className={styles.samilarProduct}>
                          <img src={item?.img[0]?.jpeg} alt="img" />
                          <div className={styles.samilarProductText}>
                            <div className={styles.samilarProductTitle}>
                              {item?.title}
                            </div>
                            <div className={styles.samilarProductPrice}>
                              {item?.currency}
                              {item?.price}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.productContent}>
              <h2 className={styles.productTitle}>{product?.title}</h2>
              <div className={styles.productPrice}>
                <p className={styles.price}>
                  <span>
                    {product?.currency === "$ (USD)" ? "$" : "֏"}
                    {product?.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                  </span>
                </p>
              </div>
              <div className={styles.productLocation}>
                <span className={styles.location}>
                  <MdLocationPin className={styles.locIcon} />{" "}
                </span>
                <span className={styles.locName}>{product?.location}</span>
              </div>

              <div className={styles.productDetailLabel}>
                <h4>about item: </h4>
                <p className={styles.productDescription}>
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
