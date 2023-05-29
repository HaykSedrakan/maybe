import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Baner.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import { GrPrevious, GrNext } from 'react-icons/gr'
import './SliderDots.scss'

const Banner = () => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/baners`, {
          withCredentials: true,
          sameSite: 'none',
        })
        const dataParser =
          res.data &&
          res.data.map((item) => {
            return {
              id: item.id,
              img: JSON.parse(item.img),
              label: 'Banner',
            }
          })

        setBanners(dataParser)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBanners()
  }, [])

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <button
        className={`${className} ${styles.customPrevArrow}`}
        style={style}
        onClick={onClick}>
        <GrPrevious />
      </button>
    )
  }

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <button
        className={`${className} ${styles.customNextArrow}`}
        style={style}
        onClick={onClick}>
        <GrNext />
      </button>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        {banners.map((item) => (
          <div key={item.id}>
            <div className={styles.slide}>
              <img src={item?.img?.jpeg} alt="Banner" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Banner
