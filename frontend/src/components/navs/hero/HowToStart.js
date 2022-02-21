import React from "react";

function HowToStart() {
  return (
    <div className="how-to-area bg-color-2 area-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="section-headline text-center">
              <h2>How to start</h2>
              <p>
                We focused majorly on growing your financial assets with
                unbeatable rates as return on investment (ROI).
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-how first-item">
              <div className="how-img">
                <span className="h-number">01</span>
                <a className="big-icon">
                  <img src="img/about/h1.png" alt="" />
                </a>
              </div>
              <div className="how-wel">
                <div className="how-content">
                  <h4>Get Access</h4>
                  <p>Register, Verify Account, Login.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-how ">
              <div className="how-img">
                <span className="h-number">02</span>
                <a className="big-icon">
                  <img src="img/about/h2.png" alt="" />
                </a>
              </div>
              <div className="how-wel">
                <div className="how-content">
                  <h4>Investment</h4>
                  <p>Invest Bigger, Earn Bigger.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-how thired-item">
              <div className="how-img">
                <span className="h-number">03</span>
                <a className="big-icon">
                  <img src="img/about/h3.png" alt="" />
                </a>
              </div>
              <div className="how-wel">
                <div className="how-content">
                  <h4>Get Profit</h4>
                  <p>
                    Enjoy Higher Profit And Withdrawals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToStart;
