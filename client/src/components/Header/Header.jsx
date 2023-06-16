import React, { useState } from 'react'
import './Header.css'
import SideNavigation from '../SideNav/sidenav'
import { RiShoppingCartLine } from 'react-icons/ri'
import { MdLanguage } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import ProductCard from '../ProductCard/ProductCard'
import styles from './Menu.module.css'
import { FaHeart, FaUserAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { TbLogout } from 'react-icons/tb'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar'
import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import '../SearchBar/SearchBar.css'
import { useNavigate } from 'react-router-dom'
import Banner from '../Baner/Baner'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DropDownLanguage from './DropDownLanguage/DropDownLanguage'

// import SideNavigation from "../sidenav";

export default function Header() {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const { isAuth, user } = useUser()

  const [language, setLanguage] = React.useState('')

  const handleLangChange = (event) => {
    setLanguage(event.target.value)
  }

  const handleClickMenu = () => {
    setActive(!active)
  }

  async function handleLogout() {
    await axios
      .post(`${process.env.REACT_APP_API}/logout`, {
        withCredentials: true,
        sameSite: 'none',
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err))
  }

  const handleNavigate = () => {
    navigate('/login')
  }

  const selectStyles = {
    width: '120px',
    height: '30px',
  }

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
    border: '1px solid black',
  }

  const formStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
  }

  return (
    <>
      <header className="header">
        <div className="sidenav-div">
          <SideNavigation />
        </div>
        <div className="navbar-div">
          <Link className="navbar-span" to="/">
            <span className="navbarSpann">SellSpot</span>
          </Link>
          {/* <span className="navbar-span">Contact</span> */}
        </div>
        <div className="searchBar-div">
          <SearchBar />
        </div>

        <div className="icons-div">
          {isAuth && (
            <div className="lang-div">
              <button className="adBtnHeader">
                <Link to={'/my/cabinet/add/new/product'} className="width">
                  Post an Ad
                </Link>
              </button>
            </div>
          )}
          <div className={styles.userDiv}>
            <div className={styles.action} onClick={handleClickMenu}>
              <div className={styles.profile}>
                <img
                  alt="img"
                  src={
                    !user?.avatar?.jpeg
                      ? '/image/icons/defaultavata.webp'
                      : user?.avatar?.jpeg
                  }
                />
              </div>
              <div className={`${styles.menu} ${active && styles.active}`}>
                <ul className={styles.menuUl}>
                  {isAuth ? (
                    <>
                      <li>{user?.name}</li>
                      <li>
                        <FaUserAlt className={styles.icon} />
                        <Link to="/cabinet"> Cabinet</Link>
                      </li>
                      <li>
                        <FaHeart className={styles.icon} />
                        <Link to="/my/favorites/products">Favorites</Link>
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
    </>
  )
}
