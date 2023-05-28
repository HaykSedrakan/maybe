import React, { useState } from "react";
import "./Cabinet.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

export default function Cabinet() {
  const [active, setActive] = useState(true);
  const [activeButton, setActiveButton] = useState(true);

  const handleActiveTabToggle = (id) => {
    setActiveButton(id);
  };
  const handleactiveToggle = () => {
    setActive(!active);
  };
  return (
    <>
      <Header />
      <div className="main">
        <div className="cabinetContainer">
          <div className="pageTab">
            <div
              onClick={() => handleactiveToggle()}
              className={`ownAdverts ${active ? "active" : ""}`}
            >
              Ads
            </div>
          </div>
          <div className="tabBody">
            <div className="tabBar">
              <Link to={"/cabinet/active"}>
                <div
                  className={`activeBar ${
                    activeButton === "active" ? "active" : ""
                  }`}
                  onClick={() => handleActiveTabToggle("active")}
                >
                  Active
                </div>
              </Link>
              <Link to={"/cabinet/inactive"}>
                <div
                  className={`inActiveBar ${
                    activeButton === "inactive" ? "active" : ""
                  }`}
                  onClick={() => handleActiveTabToggle("inactive")}
                >
                  Inactive
                </div>
              </Link>
            </div>
            <div className="ads">
              <div className="notFound">
                You do not have any active postings at this time.
              </div>
              <button className="adBtn">Post an Ad</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
