import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import Header from '../components/Header/Header'
import ProductCard from '../components/ProductCard/ProductCard'
import Banner from '../components/Baner/Baner'
import Footer from '../components/Footer/Footer'

export default function NavBarLayout() {
  return (
    <div>
      <Header />
      <Banner />
      <ProductCard />
      <Outlet />
      <Footer />
    </div>
  )
}
