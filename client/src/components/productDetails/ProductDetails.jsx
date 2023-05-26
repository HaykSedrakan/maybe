import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Header from "../Header/Header";

import { MdLocationPin } from "react-icons/md";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";


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
      <div className="productPage">
        <div className="card-wrapper">
          <div className="card">
            <div className="img-display">
              <div className="img-showcase">
                <img src={product?.image} alt="img" />
              </div>
            </div>

            <div className="menu">
              <div className="purchase-info">
                <div className="fav" onClick={toggleClass}>
                  <FaHeart
                    className={!isActive ? "fav-icon" : "fav-icon_active"}
                  />
                </div>
                <div className="user-info">
                  <div className="user-img">
                    <FaUserCircle className="user-icon" />
                  </div>
                  <div className="user-name">User Name</div>
                  <div className="since">On 'title' since 'time'</div>
                </div>
                <div className="btns">
                  <button type="button" class="btn btn-now">
                    Contact
                  </button>
                  <button className="btn btn-fav">Favourite</button>
                </div>
              </div>
              <div className="additions">
                <div className="to-top addition">
                  <FaCheck className="check-icon" />
                  <p>Top</p>
                </div>
                <div className="to-home addition">
                  <FaCheck className="check-icon" />
                  <p>Home</p>
                </div>
                <div className="to-urgently addition">
                  <FaCheck className="check-icon" />
                  <p>Urgently</p>
                </div>
              </div>
              <div className="samilar-products-div">
                <p>Samilar Adverts</p>
                <div className="samilar-products">
                  <div className="samilar-product">
                    <img src={product?.image} alt="img" />
                    <div className="samilar-product-text">
                      <div className="samilar-product-title">
                        {" "}
                        {product?.label}
                      </div>
                      <div className="samilar-product-price">
                        {" "}
                        {product?.currency === "USD" ? "$" : "֏"}
                        {product?.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-content">
              <h2 className="product-title">{product?.label}</h2>
              <div className="product-location">
                <span className="location">
                  <MdLocationPin className="loc-icon" />{" "}
                </span>
                <span className="loc-name">{product?.location}</span>
              </div>
              <div className="product-price">
                <p className="price">
                  <span>
                    Price: {product?.currency === "USD" ? "$" : "֏"}
                    {product?.price}
                  </span>
                </p>
              </div>

              <div className="product-detail">
                <h2>about item: </h2>
                <p className="product-description">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
