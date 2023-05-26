import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'
import { Typography } from '@mui/material'

const FooterContainer = styled.footer`
  background-color: #86c232;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`

const FooterContainer2 = styled.footer`
  background-color: #222629;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconLink = styled.a`
  color: #474b4f;
  margin: 0 10px;
  font-size: 24px;
`

const Footer = () => {
  return (
    <>
      <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <FooterContainer>
          <IconLink href="https://www.twitter.com/projectName">
            <FaTwitter />
          </IconLink>{' '}
          <SocialMediaIcons>
            <IconLink href="https://www.youtube.com/projectName">
              <FaYoutube />
            </IconLink>{' '}
            <IconLink href="https://www.facebook.com/projectName">
              <FaFacebookF />
            </IconLink>{' '}
            <IconLink href="https://www.instagram.com/projectName">
              <FaInstagram />
            </IconLink>{' '}
          </SocialMediaIcons>{' '}
        </FooterContainer>{' '}
        <FooterContainer2>
          <Typography
            variant="body1"
            sx={{
              color: '#86c232',
            }}>
            {' '}
            ©ACA Project Inc.2023 | All Rights Reserved{' '}
          </Typography>
        </FooterContainer2>
      </div>
    </>
  )
}

export default Footer
