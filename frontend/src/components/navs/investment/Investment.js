import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Subscribe from "../hero/Subscribe";
import Plan from "../hero/Plan";


const Investment = () => {

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
                  <h2>Investment plan</h2>
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
                            Investment plan
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
        <Plan />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
};

export default Investment;
