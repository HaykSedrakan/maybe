import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBarLayout from './Layouts/outlet'
import Header from './components/Header/Header.jsx'
import Registration from './components/Registration/Registration'
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import LoginPage from './components/LoginPage/LoginPage'
import NotFound from './components/ErrorPage/ErrorPage'
import ProductDetails from './components/productDetails/ProductDetails'
import useUser from './hooks/useUser'

function App() {
  const { isAuth, user } = useUser()
  console.log(user)
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBarLayout />} />
        <Route path="/login/auth" element={<LoginPage />} />{' '}
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />{' '}
      </Routes>
    </>
  )
}

export default App
