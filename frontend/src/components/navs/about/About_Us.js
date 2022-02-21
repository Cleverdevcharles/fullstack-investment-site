import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Faq from "../hero/Faq";
import HowToStart from "../hero/HowToStart";
import OurTeam from "../hero/OurTeam";
import Subscribe from "../hero/Subscribe";
import { getSites } from "../../../functions/site";

const About_Us = () => {
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
      <Header />
      <main>
        <div className="page-area bread-pd">
          <div className="breadcumb-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-title text-center">
                  <h2>About Us</h2>
                  <div className="bread-come">
                    <nav aria-label="breadcrumb ">
                      <ol className="breadcrumb purple lighten-4 justify-content-center">
                        <li className="breadcrumb-items">
                          <a className="black-text" href="#">
                            Home
                          </a>
                          <i className="ti-angle-right" aria-hidden="true"></i>
                        </li>
                        <li className="breadcrumb-items">
                          <a className="black-text" href="#">
                            About us
                          </a>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HowToStart />
        <div className="about-page-area bg-color fix area-padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="section-headline text-center">
                  <h2>About Custom</h2>
                  <p>
                    We focused majorly on growing your financial assets with
                    unbeatable rates as return on investment (ROI).
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg- col-md-12">
                <div className="about-page-image">
                  <img src="img/about/ab.jpg" alt="about_us_image" />
                </div>
              </div>
              {sites.map((s, i) => (
                <div className="col-xl-6 col-lg-6 col-md-12" key={i}>
                  <div className="about-wraper">
                    <div className="about-page-text">
                      <h2>About our company</h2>
                      <p>{s.about}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OurTeam />
        <Faq />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
};

export default About_Us;
