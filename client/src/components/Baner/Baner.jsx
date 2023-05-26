import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Baner.module.scss'

const Banner = () => {
  const [baners, setBanners] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0) // Добавлено: хранение текущего слайда

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/baners`, {
          withCredentials: true,
          sameSite: 'none',
        })
        const datasParser =
          res.data &&
          res.data.map((item) => {
            return {
              id: item.id,
              img: JSON.parse(item.img),
              label: 'Baner',
            }
          })

        setBanners(datasParser)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBanners()
  }, [])

  console.log(baners)

  const settings = {
    className: '',
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Добавлено: обновление текущего слайда
    customPaging: (i) => (
      <div
        className={styles.dot}
        style={{
          backgroundColor: i === currentSlide ? '#777' : 'red',
        }}></div>
    ),
  }

  return (
    <Slider {...settings}>
      {baners.map((baner, index) => (
        <div key={index}>
          {' '}
          {/* Добавлено: ключ для элементов слайдера */}
          <img src={baner?.img?.jpeg} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  )
}

export default Banner
