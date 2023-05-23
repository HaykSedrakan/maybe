import React, { useEffect, useState } from 'react'
import './ProductDetails.css'

import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsCheckCircleFill,
  BsFillCartFill,
} from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetails() {
  const { pathname } = useLocation()
  const [product, setProduct] = useState([])

  const productId = pathname.split('/')[3]

  console.log(productId)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          'https://b18d-2a00-cc47-232c-1101-00-11aa.ngrok-free.app/products'
        )
        const filteredProduct =
          res.data && res.data.filter((item) => item.id === +productId)
        setProduct(filteredProduct[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <div className="productPage">
      <div class="card-wrapper">
        <div class="card">
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
                <img src={product?.image} alt="shoe" />
              </div>
            </div>
            {/* <div class="img-select">
              <div class="img-item">
                <img data-id="1" src={product?.image} alt="shoe" />
              </div>
            </div> */}
          </div>

          <div class="product-content">
            <h2 class="product-title">{product?.label}</h2>
            <div class="product-price">
              <p class="price">
                Price:{' '}
                <span>
                  {product?.currency} {product?.price}
                </span>
              </p>
            </div>

            <div class="product-detail">
              <h2>about item: </h2>
              <p>{product?.description}</p>
              <ul>
                <li>
                  <BsCheckCircleFill className="details-icons" /> Color:{' '}
                  <span>Black</span>
                </li>
                <li>
                  <BsCheckCircleFill className="details-icons" />
                  Available: <span>in stock</span>
                </li>
                <li>
                  <BsCheckCircleFill className="details-icons" />
                  Category: <span>Shoes</span>
                </li>
                <li>
                  <BsCheckCircleFill className="details-icons" />
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  <BsCheckCircleFill className="details-icons" />
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </div>

            <div class="purchase-info">
              <button type="button" class="btn btn-add">
                Add to Cart
              </button>
              <button type="button" class="btn btn-now">
                Call
              </button>
              <button class="btn-fav">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
