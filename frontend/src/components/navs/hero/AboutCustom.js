import React from "react";
import video from "./video/why_you_should_invest.mp4"

const AboutCustom = () => {
  return (
    <div className="about-area bg-color fix area-padding-2">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="section-headline text-center">
              <h2>About Custom</h2>
              <p>
                We focused majorly on growing your financial assets with
                unbeatable rates as return on investment (ROI).
              </p>
              <video controls className="col-12">
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCustom;
