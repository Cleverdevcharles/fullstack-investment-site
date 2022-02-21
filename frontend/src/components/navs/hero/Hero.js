import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getSites } from "../../../functions/site";
import { isAuthenticated } from "../../../functions/auth";

function Hero() {
  const [sites, setSites] = useState([]);
  const [sitesByArrival, setSitesByArrival] = useState([]);
  const [error, setError] = useState(false);
  
  const loadSitesByArrival = () => {
    getSites("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setSitesByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadSitesByArrival();
  }, []);

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


  const { user } = isAuthenticated();

  return (
    <div className="intro-area intro-home">
      <div className="bg-wrapper">
        <img src="img/background/bg4.jpg" alt="" />
      </div>
      <div className="intro-content">
        <div className="slider-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="slide-all-text">
                  <div className="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                    <h4 className="title-1">
                      Safe and secure investment company
                    </h4>
                  </div>

                  <div className="layer-2 wow fadeInUp" data-wow-delay="0.3s">
                    <h1 className="title-2">
                      Invest for future in best platform
                    </h1>
                  </div>

                  <div className="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                    {user ? 
                    <Link to="/investment" className="ready-btn">
                      Invest Now
                    </Link>
                    :
                    <Link to="/register" className="ready-btn">
                      Get Started
                    </Link>
                    }
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div
                  className="slide-images-inner wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="slide-images">
                    <img src="img/slider/s1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
