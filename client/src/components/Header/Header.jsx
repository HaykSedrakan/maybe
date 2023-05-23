import React, { useState } from 'react'
import './Header.css'
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

// import SideNavigation from "../sidenav";

export default function Header() {
  const [active, setActive] = useState(false)
  const { isAuth, user } = useUser()

  const handleClickMenu = () => {
    setActive(!active)
  }

  async function handleLogout() {
    await axios
      .post('https://6bf6-2a00-cc47-232c-1101-00-11aa.ngrok-free.app/logout')
      .then(() => console.log('User has been logout successfully!'))
      .catch((err) => console.log(err))
  }

  console.log(user, isAuth)
  return (
    <>
      <header className="header">
        <div className="sidenav-div">
          <SideNavigation />
        </div>
        <div className="navbar-div">
          <span className="navbar-span">Home</span>
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
                <img src="./assets/avatar.jpg" />
              </div>
              <div className={`${styles.menu} ${active && styles.active}`}>
                <ul>
                  <li>
                    <FaUserAlt className={styles.icon} />
                    <a href="#">My profile</a>
                  </li>
                  <li>
                    <FiSettings className={styles.icon} />
                    <a href="#">Edit profile</a>
                  </li>
                  <li>
                    <TbLogout className={styles.icon} />
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ProductCard />
    </>
  )
}
