import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../../functions/auth";

const SideBar = () => {
  const {
    user: { _id, fullName, email, role },
  } = isAuthenticated();
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-4">
        <aside className="sidebar">
          <div className="dashboard-side">
            <div className="dashboard-head">
              <div className="dashboard-profile">
                <img
                  src="img/avatar/profile_image.png"
                  width="110px"
                  height="100px"
                  alt="profile image"
                />
                <div className="profile-content text-white">
                  <span className="pro-name">{fullName}</span>
                  <span className="pro-number">{email}</span>
                </div>
              </div>
            </div>
            <div className="dashboard-menu">
              <ul>
                <li className="active">
                  <Link to="#">
                    <i className="ti-dashboard"></i>Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/investment-history">
                    <i className="ti-new-window"></i>Investment History
                  </Link>
                </li>
                <>
                  {role === "Admin" ? (
                    <>
                      <hr />
                      <li>
                        <Link to="/admin-create-site-details">
                          <i className="ti-new-window"></i>Create Site Details
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin-site-details">
                          <i className="ti-new-window"></i>View Site Details
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <Link to="/admin-create-new-investment-package">
                          <i className="ti-new-window"></i>Create Investment Package
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin-investment-packages">
                          <i className="ti-new-window"></i>All Investment Packages
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <Link to="/admin-investment-orders">
                          <i className="ti-new-window"></i>All Investment Orders
                        </Link>
                      </li>
                    </>
                  ) : null}
                </>
                <li>
                  <Link
                    to={
                      role === "Admin"
                        ? "/admin-dashboard-user-info"
                        : "/dashboard-user-info"
                    }
                  >
                    <i className="ti-settings"></i>Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
