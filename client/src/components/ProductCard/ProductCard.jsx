import React, { useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Link, useNavigate } from 'react-router-dom'

const ProductCard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/productsNew`)
        const parsedDatas =
          res.data &&
          res.data.map((item) => {
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
            }
          })
        parsedDatas && setProducts(parsedDatas.slice(0, 15))
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleNavigate = (id) => {
    navigate(`/product/details/${id}`)
  }

  return (
    <>
      <div className={styles.container}>
        {products &&
          products.map((item) => (
            <div
              onClick={() => handleNavigate(item?.id)}
              className={styles.card}
              key={item.id}>
              <img
                className={styles.img}
                src={item?.img[0]?.jpeg}
                alt={item?.label}
              />
              <div className={styles.cardContent}>
                <div className={styles.price}>
                  {' '}
                  {item?.currency === 'USD' ? '$' : '֏'}{' '}
                  {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                </div>
                <div className={styles.title}>{item?.title}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default ProductCard
