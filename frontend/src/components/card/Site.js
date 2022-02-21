import React from "react";
import Logo from "../show_image/ShowImage";
import { Link } from "react-router-dom";

const Site = ({ site }) => {
  
  return (
    <div className="logo-container">
      <Link to="/">
        <Logo item={site} url="site" />
      </Link>
    </div>
  );
};

export default Site;
