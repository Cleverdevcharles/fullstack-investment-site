import React from "react";
import Header from "../../components/navs/header/Header";
import { isAuthenticated } from "../../functions/auth";
import Footer from "./nav/Footer";
import PageArea from "./nav/PageArea";
import SideBar from "./nav/SideBar";

const Subscriber = () => {
  const {
    user: { _id, fullName, email },
  } = isAuthenticated();
  const token = isAuthenticated().token;
  return (
    <>
      <Header />
      <main>
        <PageArea />
        <div className="notify-overlay"></div>
        <div className="notify-overlay"></div>
        <div className="dsahboard-area bg-color area-padding">
          <div className="container">
            <div className="row">
              <SideBar />
              <div className="col-xl-9 col-lg-9 col-md-8">
                <div className="row dashboard-content">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Invest</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-004-bar-chart"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Total Investment</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-027-money-bag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Total Percentage Profite</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-027-money-bag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subscriber;
