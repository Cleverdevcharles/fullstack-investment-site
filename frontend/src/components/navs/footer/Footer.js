import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSites } from "../../../functions/site";

const Footer = () => {
  const [sites, setSites] = useState([]);

  const loadSites = () => {
    getSites().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
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
        <footer className="footer1">
          <div className="footer-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-lg-10 col-md-12">
                  <div className="footer-content logo-footer">
                    <div className="footer-head">
                      <h4>About D-Hikes</h4>
                      <p>
                        {s.about}
                      </p>
                      <div className="footer-icons">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fas fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-google"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-pinterest"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4">
                  <div className="footer-content">
                    <div className="footer-head">
                      <h4>Invest plan</h4>
                      <ul className="footer-list">
                        <li>
                          <Link to="/investment">Silver plan</Link>
                        </li>
                        <li>
                          <Link to="/investment">Gold plan</Link>
                        </li>
                        <li>
                          <Link to="/investment">Platinum Plan</Link>
                        </li>
                        <li>
                          <Link to="/investment">Diamond plan</Link>
                        </li>
                        <li>
                          <Link to="/investment">Premium plan</Link>
                        </li>
                        <li>
                          <Link to="/investment">Custom plan</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-area-bottom">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="copyright">
                    <p>
                      Copyright © 2016
                      <a href="#"> {s.name}</a> All Rights Reserved
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
                        <Link to="/contact">Contact</Link>
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
