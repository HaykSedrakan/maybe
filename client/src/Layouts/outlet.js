import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import Header from '../components/Header/Header'
import ProductCard from '../components/ProductCard/ProductCard'
import CarouselComponents from '../components/Carousel/carousel'

export default function NavBarLayout() {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <div>
      <Header /> {/* <CarouselComponent /> */} <ProductCard />
      <Outlet />
    </div>
  )
}
