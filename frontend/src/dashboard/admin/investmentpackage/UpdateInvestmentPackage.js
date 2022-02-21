import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../../functions/auth";
import {
  getInvestmentPackage,
  updateInvestmentPackage,
} from "../../../functions/investmentpackage";
import Header from "../../../components/navs/header/Header";
import Footer from "../nav/Footer";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";

const UpdateInvestmentPackage = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    minimum_amount: "",
    maximum_amount: "",
    percentage_interest: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const {
    name,
    minimum_amount,
    maximum_amount,
    percentage_interest,
    duration,
  } = values;

  const init = (investmentpackageId) => {
    getInvestmentPackage(investmentpackageId).then((data) => {
      if (data.error) {
        setValues({ ...values });
        console.log(data.error);
        toast.error(data.error);
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          minimum_amount: data.minimum_amount,
          maximum_amount: data.maximum_amount,
          percentage_interest: data.percentage_interest,
          duration: data.duration,
        });
        console.log(data);
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  useEffect(() => {
    init(match.params.investmentpackageId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Investment package  name is required.");
      }, 1000);
      return;
    }
    if (name.length > 32) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Investment package name is long, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (name.length <= 2) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Investment package  name is short, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (!duration) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Duration is required. ");
      }, 1000);
      return;
    }
    if (!minimum_amount) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Minimum investment amount  is required. ");
      }, 1000);
      return;
    }
    if (minimum_amount <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Minimum investment amount can not be equal to or less than 0."
        );
      }, 1000);
      return;
    }
    if (!maximum_amount) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Maximum investment amount  is required. ");
      }, 1000);
      return;
    }
    if (maximum_amount <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Maximum investment amount can not be equal to or less than 0."
        );
      }, 1000);
      return;
    }
    if (!percentage_interest) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Percentage interest  is required. ");
      }, 1000);
      return;
    }
    if (percentage_interest <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Percentage interest can not be equal to or less than 0. ");
      }, 1000);
      return;
    }

    const investmentpackage = {
      name: name,
      minimum_amount: minimum_amount,
      maximum_amount: maximum_amount,
      percentage_interest: percentage_interest,
      duration: duration,
    };

    // make request to api to create category
    updateInvestmentPackage(
      match.params.investmentpackageId,
      user._id,
      token,
      investmentpackage
    ).then((data) => {
      if (data.error) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.error(data.error);
        }, 1000);
        console.log(data);
      } else {
        setLoading(true);
        setLoading(false);
        toast.success(`Investment Package "${name}" updated successfully.`);
        setValues({
          ...values,
          name: "",
          minimum_amount: "",
          maximum_amount: "",
          percentage_interest: "",
          duration: "",
        });
      }
    });
  };

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
                <div className="login-area area-padding fix">
                  <div className="login-overlay"></div>
                  <div className="container">
                    <div className="row justify-content-center text-center ">
                      <div className="col-xl-8 col-lg-10 col-md-10">
                        <div className="login-form signup-form">
                          <h4 className="login-title text-center">
                            Update Investment Package
                          </h4>
                          <form
                            id="contactForm"
                            className="log-form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Please enter your investment package name"
                                  onChange={handleChange("name")}
                                  value={name}
                                  name="name"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Please enter your investment package minimum amount."
                                  onChange={handleChange("minimum_amount")}
                                  value={minimum_amount}
                                  name="minimum_amount"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Please enter your investment package maximum amount."
                                  onChange={handleChange("maximum_amount")}
                                  value={maximum_amount}
                                  name="maximum_amount"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Please enter your investment percentage initerest"
                                  onChange={handleChange("percentage_interest")}
                                  value={percentage_interest}
                                  name="percentage_interest"
                                />
                              </div>
                              <select
                                className="col-md-6 form-control"
                                onChange={handleChange("duration")}
                                name="duration"
                              >
                                <option selected style={{ color: "gray" }}>
                                  Select Duration
                                </option>
                                <option value="7" style={{ color: "gray" }}>
                                  Weekly
                                </option>
                                <option value="30" style={{ color: "gray" }}>
                                  Monthly
                                </option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="slide-btn login-btn"
                            >
                              {loading ? (
                                <div className="spinner" id="spinner">
                                  Loading...
                                </div>
                              ) : (
                                <b>Update</b>
                              )}
                            </button>
                          </form>
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

export default UpdateInvestmentPackage;
