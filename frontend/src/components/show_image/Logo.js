import React from "react";
import { BACKEND_API } from "../../config";

const Logo = ({ item, url, site }) => (
  <>
    <img
      className="logo"
      src={`${BACKEND_API}/${url}/logo/${item._id}`}
      width="100px"
      height="40px"
      style={{marginTop: "-20px"}}
      alt={item.name}
    />
  </>
);

export default Logo;
