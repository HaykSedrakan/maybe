import React, { useState } from 'react'
import './Header.scss'
import SideNavigation from '../SideNav/sidenav'
import { RiShoppingCartLine } from 'react-icons/ri'
import { MdLanguage } from 'react-icons/md'
import ProductCard from '../ProductCard/ProductCard'
import styles from './Menu.module.css'
import { FaUserAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { TbLogout } from 'react-icons/tb'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar'
import useUser from '../../hooks/useUser'
import { useNavigate, Link } from 'react-router-dom'
import Banner from '../Baner/Baner'

export default function Header() {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const { isAuth, user } = useUser()

  const handleClickMenu = () => {
    setActive(!active)
  }

  async function handleLogout() {
    await axios
      .post(`${process.env.REACT_APP_API}/logout`, {
        withCredentials: true,
        sameSite: 'none',
      })
      .then(() => console.log('User has been logout successfully!'))
      .catch((err) => console.log(err))
  }

  const handleNavigate = () => {
    navigate('/login/auth')
  }

  return (
    <>
      <header className="header">
        <div className="sidenav-div">
          <SideNavigation />
        </div>
        <div className="navbar-div">
          <Link className="navbar-span" to="/">
            <span>Trade</span>
            {/* <img
              className={styles.siteLogo}
              src="/image/icons/logo.jpeg"
              alt="LOGO"
            /> */}
            <span>Verse</span>
          </Link>
          <span className="navbar-span">Contact</span>
        </div>
        <div className="searchBar-div">
          <SearchBar />
        </div>

        <div className="icons-div">
          <div className="lang-div">{<MdLanguage className="lang-icon" />}</div>
          <div className="cart-div">
            {<RiShoppingCartLine className="scart-icon" />}
          </div>
          <div className="user-div">
            <div className={styles.action} onClick={handleClickMenu}>
              <div className={styles.profile}>
                <img
                  src={
                    !user?.avatar?.jpeg
                      ? '/image/icons/defaultavata.webp'
                      : user?.avatar?.jpeg
                  }
                />
              </div>
              <div className={`${styles.menu} ${active && styles.active}`}>
                <ul>
                  {isAuth ? (
                    <>
                      <li>
                        <a href="#">{user?.name}</a>
                      </li>
                      <li>
                        <FaUserAlt className={styles.icon} />
                        <a href="#">Мy officee</a>
                      </li>
                      <li>
                        <FaUserAlt className={styles.icon} />
                        <Link to="/my/favorites/products">Мy Favorites</Link>
                      </li>
                      <li>
                        <FiSettings className={styles.icon} />
                        <Link to={`/user/${user.id}/account/settings`}>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <TbLogout className={styles.icon} />
                        <a onClick={handleLogout}>Logout</a>
                      </li>
                    </>
                  ) : (
                    <li onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                      Login / Auth
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Banner />
    </>
  )
}
