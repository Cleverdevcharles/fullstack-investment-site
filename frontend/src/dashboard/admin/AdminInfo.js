import React, { useEffect, useState } from "react";
import Header from "../../components/navs/header/Header";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../functions/auth";
import { read } from "../../functions/user";
import SideBar from "./nav/SideBar";
import Footer from "./nav/Footer";

const AdminInfo = ({ match }) => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    referralCode: "",
    state: "",
    country: "",
    verified: "",
    password: "",
    usdt_address: "",
    error: false,
  });
  const { user, token } = isAuthenticated();
  const {
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    state,
    verified,
    country,
    usdt_address,
  } = values;

  const init = () => {
    const userId = user._id;
    console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(token);
        console.log(data);
        setValues({ ...values, error: true });
      } else {
        console.log(data);
        if (data.verified) {
          const verifiedUser = "Yes";
          setValues({
            ...values,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            state: data.state,
            country: data.country,
            role: data.role,
            verified: verifiedUser,
            referralCode: data.referralCode,
            password: data,
            usdt_address: data.usdt_address,
          });
        } else {
          setValues({
            ...values,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            state: data.state,
            country: data.country,
            role: data.role,
            verified: "Not verified",
            referralCode: data.referralCode,
            password: data,
            usdt_address: data.usdt_address
          });
        }
      }
    });
  };

  useEffect(() => {
    const userId = match.params.userId;
    init(userId);
  }, []);

  const ProfileInfo = (
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    state,
    verified,
    country,
    usdt_address
  ) => (
    <main>
      <div className="page-area bread-pd">
        <div className="breadcumb-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb-title">
                <h2>User Information </h2>
                <div className="bread-come">
                  <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb purple lighten-4">
                      <li className="breadcrumb-items">
                        <a className="black-text" href="#">
                          Home
                        </a>
                        <i className="ti-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="breadcrumb-items">
                        <a className="black-text" href="#">
                          User Information{" "}
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
      <div className="notify-overlay"></div>
      <div className="dsahboard-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <SideBar />
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="user-info-inner">
                <div className="user-info-inner_header">
                  <h3 className="user-info-card__title">Personal Details</h3>
                  <Link to={`/admin-dashboard-update-info-${user._id}`}>
                    <button type="button">
                      <i className="ti-pencil-alt"></i> Edit
                    </button>
                  </Link>
                </div>
                <ul className="user-info-inner_list">
                  <li>
                    <span className="caption">Name</span>
                    <span className="value">{fullName}</span>
                  </li>
                  <li>
                    <span className="caption">Email</span>
                    <span className="value">{email}</span>
                  </li>
                  <li>
                    <span className="caption">Phone</span>
                    <span className="value">{phone}</span>
                  </li>
                  <li>
                    <span className="caption">Country</span>
                    <span className="value">{country}</span>
                  </li>
                  <li>
                    <span className="caption">Role</span>
                    <span className="value">{role}</span>
                  </li>
                  <li>
                    <span className="caption">Verified</span>
                    <span className="value">{verified}</span>
                  </li>
                  <li>
                    <span className="caption">State/Region</span>
                    <span className="value">{state}</span>
                  </li>
                </ul>
              </div>
              <div className="user-info-inner">
                <div className="user-info-inner_header">
                  <h3 className="user-info-card__title">Withdrawal Details</h3>
                  <Link to={`/admin-dashboard-update-info-${user._id}`}>
                    <button type="button">
                      <i className="ti-pencil-alt"></i> Edit
                    </button>
                  </Link>
                </div>
                <ul className="user-info-inner_list">
                  <li>
                    <span className="caption">USDT Address</span>
                    <span className="value">{usdt_address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  return (
    <>
      <Header />
      {ProfileInfo(
        fullName,
        email,
        password,
        phone,
        role,
        referralCode,
        state,
        verified,
        country
      )}
      <Footer />
    </>
  );
};

export default AdminInfo;
