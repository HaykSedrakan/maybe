import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CategoryIcon from '@mui/icons-material/Category'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import axios from 'axios'
import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../redux/category/categoryActions'

const StyledDrawerHeader = styled.div`
  background-color: #6d5dfc;
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: flex-end;
`

const SideNavigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.category)
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const drawerStyle = {
    background: '#000',
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/categories`)
        const filterOnDisabled =
          res.data && res.data.filter((item) => !item.disabled)

        setCategories(filterOnDisabled)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const handleChangeCategory = (value) => {
    dispatch(setCategory(value))
    navigate('/product/search')
    setOpen(false)
  }

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: drawerStyle }}>
        <Box p={2} width="350px">
          <StyledDrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </StyledDrawerHeader>
          <List>
            <ListItem button>
              <ListItemIcon style={{ color: '#6d5dfc' }}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" style={{ color: 'white' }} />
            </ListItem>
            <List component="div" disablePadding>
              {categories !== [] &&
                categories.map((item) => (
                  <>
                    <ListItem
                      onClick={() => handleChangeCategory(item?.category)}>
                      <ListItemText
                        primary={item?.category}
                        style={{ color: 'white' }}
                      />
                    </ListItem>
                  </>
                ))}
            </List>
            <Divider />
            <br />
          </List>
        </Box>
      </Drawer>
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        style={{ color: '#6d5dfc' }}>
        <MenuOpenIcon />
      </IconButton>
    </>
  )
}

export default SideNavigation
