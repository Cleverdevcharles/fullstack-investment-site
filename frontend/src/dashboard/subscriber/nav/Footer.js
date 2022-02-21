import React, { useEffect, useState } from "react";
import { getSites } from "../../../components/apiCore";
import { Link } from "react-router-dom";

const Footer = () => {
   const [sites, setSites] = useState([]);
   const [loading, setLoading] = useState(false);

   const loadSites = () => {
     getSites().then((data) => {
       if (data.error) {
         console.log(data.error);
         setLoading(false);
       } else {
         setLoading(false);
         setSites(data);
       }
     });
   };

   useEffect(() => {
     loadSites();
   }, []);
  return (
    <>
      {sites.map((s, i) => (
        <footer class="footer1 dashboard-footer" key="i">
          <div class="footer-area-bottom">
            <div class="container">
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="copyright">
                    <p>
                      Copyright © 2016
                      <Link to="/"> {s.name}</Link> All Rights Reserved
                    </p>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="footer-menu">
                    <ul>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="#">Terms & Condition</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      ))}
    </>
  );
};

export default Footer;
