import React from 'react'
import {IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import "./Footer.css"
import { Link } from "react-router-dom"
import useUser from '../../hooks/useUser';



export default function Footer() {
    const { isAuth, user } = useUser();

  return (
    <footer className="footer">
      <div className="topDiv">
        <div className="footerLogoDiv">SellSpot</div>
        <div className="footerLinksDiv">
          <div className="footerLinks">
            {" "}
            {isAuth ? (
              <Link className='footerLink' to={`/user/${user.id}/account/settings`}> Settings </Link>
            ) : (
              "Settings"
            )}
          </div>
          <div className="footerLinks">
            {isAuth ? <Link className='footerLink' to={`/cabinet`}> Cabinet </Link> : "Cabinet"}
          </div>
          <div className="footerLinks">
            {isAuth ? (
              <Link className='footerLink' to={`/my/favourites/products`}> Favourites </Link>
            ) : (
              "Favourites"
            )}
          </div>
        </div>
      </div>
      <div className="bottomDiv">
        <div className="footerAutors">
          © 2023 SellSpot. All rights reserved.
        </div>
        <div className="footerSocLinks">
          <IconButton
            className="MuiIconButton-root MuiIconButton-colorInherit"
            aria-label="Facebook"
          >
            <Facebook />
          </IconButton>
          <IconButton
            className="MuiIconButton-root MuiIconButton-colorInherit"
            aria-label="Twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            className="MuiIconButton-root MuiIconButton-colorInherit"
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
          <IconButton
            className="MuiIconButton-root MuiIconButton-colorInherit"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
