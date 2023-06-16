import styles from './AdminDashboard.module.scss'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { BsFillVolumeUpFill } from 'react-icons/bs'
import { IoMdLogOut } from 'react-icons/io'
import { AiFillInfoCircle } from 'react-icons/ai'
import { MdProductionQuantityLimits, MdContactPhone } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BiSlideshow } from 'react-icons/bi'
import { Outlet } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { Drawer, useMediaQuery } from '@mui/material'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import GridViewIcon from '@mui/icons-material/GridView'
import EngineeringIcon from '@mui/icons-material/Engineering'
import { BsFillPeopleFill } from 'react-icons/bs'

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}))

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  )
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
}

function AdminDashboard() {
  const { pathname } = useLocation()
  const [active, setActive] = useState('aboutUs')
  const matches = useMediaQuery('(min-width:978px)')
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    try {
      await axios.put('http://localhost:3050/isAdmin', {
        isAdmin: 0,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const page = pathname.split('/')[3]

  const toggleDrawer = () => {
    setOpen(!open)
  }

  function handleChangeActive(name) {
    setActive(name)
  }

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1 className={styles.adminNavTitle}>Admin Dashboard</h1>
        </nav>
        <main
          className={
            (active === 'infoAccordeon' || active === 'partners') && styles.main
          }>
          <Outlet />
        </main>
        {matches ? (
          <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>
              <h1>SellSpot</h1>
            </div>

            <div className={styles.sidebarMenu}>
              <div className={`${styles.sidebarLink}`}>
                <GridViewIcon className={styles.icon} />
                <span>Dashboard</span>
              </div>

              <h2>Baners</h2>

              <div
                className={`${styles.sidebarLink} ${
                  active === 'mainBaner' && styles.activeMenuLink
                }`}>
                <BiSlideshow
                  onClick={() => handleChangeActive('mainBaner')}
                  className={styles.icon}
                />
                <Link
                  to="/admin/admindashboard/mainBaners"
                  onClick={() => handleChangeActive('mainBaner')}>
                  Main Baner
                </Link>
              </div>

              <h2>Categories</h2>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'categories' && styles.activeMenuLink
                }`}>
                <BiSlideshow
                  onClick={() => handleChangeActive('categories')}
                  className={styles.icon}
                />
                <Link
                  to="/admin/admindashboard/categories"
                  onClick={() => handleChangeActive('categories')}>
                  Categories
                </Link>
              </div>

              <div className={styles.sidebarLogout}>
                <IoMdLogOut className={styles.logoutIcon} />
                <Link to="/" onClick={handleLogout}>
                  Log out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.menuButtonContainer}>
            <MenuIcon className={styles.menuButton} onClick={toggleDrawer} />
          </div>
        )}

        <Drawer
          className={styles.drawer}
          anchor="right"
          open={open}
          onClose={toggleDrawer}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            p={2}
            width="300px"
            role="presentation"
            textAlign="center">
            <div className={styles.actions}>
              <div className={`${styles.sidebarLink}`}>
                <GridViewIcon className={styles.iconDrawer} />
                <span className={styles.titleDashboard}>Dashboard</span>
              </div>
              <h2 className={styles.tlt}>Pages</h2>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'aboutUs' ? styles.activeMenuLink : ''
                }`}>
                <AiFillInfoCircle
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('aboutUs')
                  }}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/aboutUs"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('aboutUs')
                  }}>
                  About Us
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'products' && styles.activeMenuLink
                }`}>
                <MdProductionQuantityLimits
                  onClick={() => handleChangeActive('products')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/products"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('products')
                  }}>
                  Products
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'partners' && styles.activeMenuLink
                }`}>
                <BsFillPeopleFill
                  onClick={() => handleChangeActive('partners')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/partners"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('partners')
                  }}>
                  Partners
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'main' && styles.activeMenuLink
                }`}>
                <EngineeringIcon
                  onClick={() => handleChangeActive('main')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/main"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('main')
                  }}>
                  Main
                </Link>
              </div>

              <div
                className={`${styles.sidebarLink} ${
                  active === 'contacts' && styles.activeMenuLink
                }`}>
                <MdContactPhone
                  onClick={() => handleChangeActive('contacts')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/contacts"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('contacts')
                  }}>
                  Contacts
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'infoAccordeon' && styles.activeMenuLink
                }`}>
                <AiOutlineClose
                  onClick={() => handleChangeActive('infoAccordeon')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/infoAccordeon"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('infoAccordeon')
                  }}>
                  Info Accordeon
                </Link>
              </div>
              <h2 className={styles.tlt}>Baners</h2>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'mainBaner' && styles.activeMenuLink
                }`}>
                <BiSlideshow
                  onClick={() => handleChangeActive('mainBaner')}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/mainBaners"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('mainBaner')
                  }}>
                  Main Baner
                </Link>
              </div>
              <h2 className={styles.tlt}>Products</h2>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'categories' && styles.activeMenuLink
                }`}>
                <BiSlideshow
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('categories')
                  }}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/categories"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('categories')
                  }}>
                  Categories
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'colors' && styles.activeMenuLink
                }`}>
                <ColorLensIcon
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('colors')
                  }}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/productsColor"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('colors')
                  }}>
                  Products Colors
                </Link>
              </div>
              <div
                className={`${styles.sidebarLink} ${
                  active === 'materials' && styles.activeMenuLink
                }`}>
                <PrecisionManufacturingIcon
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('materials')
                  }}
                  className={styles.iconDrawer}
                />
                <Link
                  to="/admin/admindashboard/productsMaterials"
                  onClick={() => {
                    toggleDrawer()
                    handleChangeActive('materials')
                  }}>
                  Product Materials
                </Link>
              </div>
            </div>
            <div className={styles.sidebarLogoutContainer}>
              <IoMdLogOut className={styles.logoutIconDrawer} />
              <Link to="/" onClick={handleLogout}>
                Log out
              </Link>
            </div>
          </Box>
        </Drawer>
      </div>
    </>
  )
}

export default AdminDashboard
