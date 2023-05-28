import React, { useState } from "react";
import "./Cabinet.css";
import Header from "../Header/Header";

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
              <div
                className={`activeBar ${
                  activeButton === "active" ? "active" : ""
                }`}
                onClick={() => handleActiveTabToggle("active")}
              >
                Active
              </div>
              <div
                className={`inActiveBar ${
                  activeButton === "inactive" ? "active" : ""
                }`}
                onClick={() => handleActiveTabToggle("inactive")}
              >
                Inactive
              </div>
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
