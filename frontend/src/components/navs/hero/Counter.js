import React from "react";

const Counter = () => {
  return (
    <div className="counter-area fix bg-color area-padding-3">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-fun">
              <span className="counter-icon">
                <i className="flaticon-034-reward"></i>
              </span>
              <div className="counter-text">
                <h2>
                  <span className="count">22609</span>+
                </h2>
                <h4>All Members</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-fun">
              <span className="counter-icon">
                <i className="flaticon-016-graph"></i>
              </span>
              <div className="counter-text">
                <h2>
                  $<span className="count">500</span>k
                </h2>
                <h4>Total Deposit</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="single-fun">
              <span className="counter-icon">
                <i className="flaticon-043-world"></i>
              </span>
              <div className="counter-text">
                <h2>
                  <span className="count">80</span>+
                </h2>
                <h4>World Country</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
