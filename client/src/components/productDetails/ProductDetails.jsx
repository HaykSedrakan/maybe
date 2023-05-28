import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

import { MdLocationPin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import { FaHeart,FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from './ProductDetails.module.css'; // ...

export default function ProductDetails() {
  const { pathname } = useLocation();
  const [product, setProduct] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };


  const productId = pathname.split("/")[3];

  console.log(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/products`);
        const filteredProduct =
          res.data && res.data.filter((item) => item.id === +productId);
        setProduct(filteredProduct[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);



  return (
    <>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardd}>
            <div className={styles.imgDisplay}>
              <div className={styles.imgShowcase}>
                <img src={product?.image} alt="img" />
              </div>
            </div>

            <div className={styles.menu}>
              <div className={styles.purchaseInfo}>
                <div className={styles.fav} onClick={toggleClass}>
                  <FaHeart
                    className={
                      !isActive ? styles.favIcon : styles.favIconActive
                    }
                  />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userImg}>
                    <FaUserCircle className={styles.userIcon} />
                  </div>
                  <div className={styles.userName}>User Name</div>
                  <div className={styles.since}>On 'title' since 'time'</div>
                </div>
                <div className={styles.btns}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnNow}`}
                  >
                    Contact
                  </button>
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
                <p>Samilar Adverts</p>
                <div className={styles.samilarProducts}>
                  <div className={styles.samilarProduct}>
                    <img src={product?.image} alt="img" />
                    <div className={styles.samilarProductText}>
                      <div className={styles.samilarProductTitle}>
                        {product?.label}
                      </div>
                      <div className={styles.samilarProductPrice}>
                        {product?.currency === "USD" ? "$" : "֏"}
                        {product?.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.productContent}>
              <h2 className={styles.productTitle}>{product?.label}</h2>
              <div className={styles.productPrice}>
                <p className={styles.price}>
                  <span>
                    Price: {product?.currency === "USD" ? "$" : "֏"}
                    {product?.price?.toString()
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

              <div className={styles.productDetail}>
                <h2>about item: </h2>
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
