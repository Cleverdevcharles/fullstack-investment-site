import React from "react";
import { Link } from "react-router-dom";

const PageArea = () => {
  return (
    <div className="page-area bread-pd">
      <div className="breadcumb-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-title">
              <h2>Dashboard</h2>
              <div className="bread-come">
                <nav aria-label="breadcrumb ">
                  <ol className="breadcrumb purple lighten-4">
                    <li className="breadcrumb-items">
                      <Link className="black-text" to="/">
                        Home
                      </Link>
                      <i className="ti-angle-right" aria-hidden="true"></i>
                    </li>
                    <li className="breadcrumb-items">
                      <a className="black-text" href="#">
                        Dashboard
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
  );
};

export default PageArea;
