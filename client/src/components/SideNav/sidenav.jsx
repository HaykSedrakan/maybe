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
import { Link } from 'react-router-dom'

const StyledDrawerHeader = styled.div`
  background-color: #6d5dfc;
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: flex-end;
`

const SideNavigation = () => {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const drawerStyle = {
    background: "#c8d0e7",
  };

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

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: drawerStyle }}
      >
        <Box p={2} width="280px">
          <StyledDrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </StyledDrawerHeader>
          <List>
            <ListItem button>
              <ListItemIcon style={{ color: "#6d5dfc" }}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" style={{ color: "#5b0eeb" }} />
            </ListItem>
            <List component="div" disablePadding>
              {categories !== [] &&
                categories.map((item) => (
                  <>
                    <ListItem button component={Link} to="/catagories/cars">
                      <ListItemText
                        primary={item?.category}
                        style={{ color: "#5b0eeb" }}
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
        style={{ color: "#5b0eeb" }}
      >
        <MenuOpenIcon />
      </IconButton>
    </>
  );
}

export default SideNavigation
