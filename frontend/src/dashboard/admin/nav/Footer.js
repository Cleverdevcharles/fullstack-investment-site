import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSites } from "../../../components/apiCore";

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
        <footer className="footer1 dashboard-footer" key="i">
          <div className="footer-area-bottom">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="copyright">
                    <p>
                      Copyright © 2016
                      <Link to="/"> {s.name}</Link> All Rights Reserved
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="footer-menu">
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
