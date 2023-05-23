import React, { useState } from 'react'
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
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

const StyledDrawerHeader = styled.div`
  background-color: #86c232;
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: flex-end;
`

const SideNavigation = () => {
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
              <ListItemIcon style={{ color: '#6B6E70' }}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" style={{ color: 'white' }} />
            </ListItem>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/catagories/cars">
                <ListItemText primary="Cars" style={{ color: 'white' }} />
              </ListItem>
              <ListItem button component={Link} to="/catagories/electronics">
                <ListItemText
                  primary="Electronics"
                  style={{ color: 'white' }}
                />
              </ListItem>
              <ListItem button component={Link} to="/catagories/realstate">
                <ListItemText primary="Real State" style={{ color: 'white' }} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/catagories/homeaccessories">
                <ListItemText
                  primary="Home & Accessories"
                  style={{ color: 'white' }}
                />
              </ListItem>
            </List>
            <Divider />
            <br />
            <ListItem button component={Link} to="/settings">
              <ListItemIcon style={{ color: '#6B6E70' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" style={{ color: 'white' }} />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemIcon style={{ color: '#6B6E70' }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" style={{ color: 'white' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        style={{ color: '#86C232' }}>
        <MenuOpenIcon />
      </IconButton>
    </>
  )
}

export default SideNavigation
