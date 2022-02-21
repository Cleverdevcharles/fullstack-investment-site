import React, { useState, useEffect } from "react";
import Header from "../../components/navs/header/Header";
import { update, read, updateUser } from "../../functions/user";
import { RegionDropdown, CountryDropdown } from "react-country-region-selector";
import Input from "react-phone-number-input/input";
import { isAuthenticated } from "../../functions/auth";
import PageArea from "./nav/PageArea";
import SideBar from "./nav/SideBar";
import Footer from "./nav/Footer";
import { toast } from "react-toastify";

const UpdateUserInfo = ({ match }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    usdt_address: "",
    email: "",
    password: "",
    error: false,
  });
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { user, token } = isAuthenticated();
  const { usdt_address, email, password, firstName, lastName, error } = values;

  const init = () => {
    const userId = user._id;
    console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error, data);
        console.log("User Id =>", user._id);
        setValues({ ...values, error: true });
      } else {
        console.log(data);
        console.log(userId);
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          usdt_address: data.usdt_address,
          email: data.email,
          password: data,
        });
        setPhone(data.phone);
        setCountry(data.country);
        setState(data.state);
      }
    });
  };

  useEffect(() => {
    const userId = match.params.userId;
    init(userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProcessing(true);
    const strongRegexSpecialCharacter = /^(.*\W).*$/;
    if (
      !firstName &&
      !lastName &&
      !phone &&
      !country &&
      !state &&
      !usdt_address
    ) {
      toast.error("Please update at least one field");
      setProcessing(false);
      return;
    }
    if (!state) {
      toast.error("State is required.");
      setProcessing(false);
      return;
    }
    if (!country) {
      toast.error("Country is required.");
      setProcessing(false);
      return;
    }
    if (!firstName) {
      toast.error("First name is required.");
      setProcessing(false);
      return;
    }
    if (strongRegexSpecialCharacter.test(firstName)) {
      toast.error("First name can't contain any special character.");
      setProcessing(false);
      return;
    }

    if (strongRegexSpecialCharacter.test(lastName)) {
      toast.error("Last name can't contain any special character.");
      setProcessing(false);
      return;
    }

    update(user._id, token, {
      firstName,
      lastName,
      fullName: firstName.trim() + " " + lastName.trim(),
      email,
      phone,
      usdt_address,
      country,
      state,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        console.log(data);
        toast.error(data.error);
        setLoading(false);
      } else {
        updateUser(data, () => {
          setLoading(false);
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            usdt_address: "",
            phone: "",
            state: "",
            country: "",
            email: data.email,
            success: true,
          });
        });
        setLoading(false);
        toast.success("Profile updated successfully.");
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
                            Update Details
                          </h4>
                          <form
                            id="contactForm"
                            className="log-form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Enter your first name..."
                                  onChange={handleChange("firstName")}
                                  value={firstName}
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Enter you last name..."
                                  onChange={handleChange("lastName")}
                                  value={lastName}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  onChange={handleChange("email")}
                                  value={email}
                                  disabled
                                />
                              </div>
                              <div className="col-md-6">
                                <Input
                                  placeholder="Enter phone number"
                                  className="form-control"
                                  value={phone}
                                  onChange={setPhone}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <CountryDropdown
                                  value={country}
                                  style={{ color: "grey" }}
                                  className="form-control"
                                  onChange={setCountry}
                                  // onChange={handleChange("country")}
                                  name="country"
                                />
                              </div>
                              <div className="col-md-6">
                                <RegionDropdown
                                  disableWhenEmpty={true}
                                  country={country}
                                  style={{ color: "grey" }}
                                  className="form-control"
                                  value={state}
                                  onChange={setState}
                                  // onChange={handleChange("region")}
                                  name="state"
                                />
                              </div>
                            </div>

                            <div>
                              <div>
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Enter your USDT BEP20 wallet address"
                                  onChange={handleChange("usdt_address")}
                                  value={usdt_address}
                                />
                                <small>
                                  Please makes sure your enter bep20 to avoid
                                  delay or no payment
                                </small>
                              </div>
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

export default UpdateUserInfo;
