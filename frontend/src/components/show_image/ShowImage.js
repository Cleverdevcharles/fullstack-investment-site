import React from "react";
import { BACKEND_API } from "../../config";

const ShowImage = ({ item, url, product }) => (
  <>
    <img src={`${BACKEND_API}/site/logo/${item._id}`} alt={item.name} />
  </>
);

export default ShowImage;
