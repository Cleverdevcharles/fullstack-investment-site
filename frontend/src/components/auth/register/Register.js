import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated, signup } from "../../../functions/auth";
import { RegionDropdown, CountryDropdown } from "react-country-region-selector";
import Input from "react-phone-number-input/input";
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    referralCode: "",
    usdt_address: "",
    password1: "",
    password2: "",
  });
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  // const [data, setData] = useState({
  //   categories: [],
  //   category: "",
  //   search: "",
  //   results: [],
  //   searched: false,
  // });
  const [term_condition, setTerm_condition] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [processing, setProcessing] = useState("");
  // const [sitesByArrival, setSitesByArrival] = useState([]);
  // const [sites, setSites] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { user } = isAuthenticated();

  // const { user } = authenticate();

  const toggleRegisterVisiblity = () => {
    setTerm_condition(term_condition ? false : true);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmpasswordShown ? false : true);
  };

  const {
    firstName,
    lastName,
    email,
    referralCode,
    password1,
    password2,
    usdt_address,
  } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    setProcessing(true);
    const strongRegexSpecialCharacter = /^(.*\W).*$/;

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
    if (!lastName) {
      toast.error("Last name is required.");
      setProcessing(false);
      return;
    }
    if (strongRegexSpecialCharacter.test(lastName)) {
      toast.error("Last name can't contain any special character.");
      setProcessing(false);
      return;
    }
    if (!usdt_address) {
      toast.error("USDT address is required.");
      setProcessing(false);
      return;
    }

    if (!email) {
      toast.error("Valid email is required.");
      setProcessing("");
      return;
    }
    if (!phone) {
      toast.error("Phone number is required.");
      setProcessing("");
      return;
    }
    if (!country) {
      toast.error("Country is required.");
      setProcessing("");
      return;
    }
    if (!state) {
      toast.error("State/Region is required.");
      setProcessing("");
      return;
    }
    if (!password1) {
      toast.error("Please create your password.");
      setProcessing("");
      return;
    }
    if (password1.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setProcessing("");
      return;
    }
    if (password1.length > 32) {
      toast.error("Password must be between 8 to 32 characters long only.");
      setProcessing("");
      return;
    }
    const strongRegexHighercase = new RegExp("^(?=.*[A-Z])");
    if (!strongRegexHighercase.test(password1)) {
      toast.error("Password must contain at least an uppercase.");
      setProcessing("");
      return;
    }
    const strongRegexLowercase = new RegExp("^(?=.*[a-z])");
    if (!strongRegexLowercase.test(password1)) {
      toast.error("Password must contain at least a lowercase.");
      setProcessing("");
      return;
    }
    const strongRegexNumber = new RegExp("^(?=.*[0-9])");
    if (!strongRegexNumber.test(password1)) {
      toast.error("Password must contain at least one number.");
      setProcessing("");
      return;
    }
    if (!strongRegexSpecialCharacter.test(password1)) {
      toast.error("Password must contain at least one special character.");
      setProcessing("");
      return;
    }
    if (!password2) {
      toast.error("Please confrim your password.");
      setProcessing("");
      return;
    }
    if (password2 !== password1) {
      toast.error("Password do not match.");
      setProcessing("");
      return;
    }
    var fullname = firstName.trim() + " " + lastName.trim();

    signup({
      firstName,
      lastName,
      fullname,
      phone,
      email,
      referralCode,
      country,
      state,
      phone,
      usdt_address,
      password: password1,
    }).then((error) => {
      if (error.status === "FAILED") {
        console.log("Final Error => ", error.message);
        toast.success(error.message);
        setProcessing(false);
      } else {
        toast.success(error.message);
        setFormData({
          ...formData,
          firstName: "",
          lastName: "",
          fullname: "",
          email: "",
          usdt_address: "",
          password1: "",
          password2: "",
          referralCode: "",
        });
        setCountry({ ...country, country: "" });
        setState({ ...state, state: "" });
        setPhone({ ...phone, phone: "" });
        setProcessing(false);
      }
    });
  };


  return (
    <>
      {user ? <Redirect to="/" /> : null}
      <div className="login-area area-padding fix">
        <div className="login-overlay"></div>
        <div className="container">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-8 col-lg-10 col-md-10">
              <div className="login-form signup-form">
                <h4 className="login-title text-center">REGISTER</h4>
                <form id="contactForm" className="log-form">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        id="name"
                        className="form-control w-full"
                        placeholder="Please enter your firstname"
                        value={firstName}
                        onChange={handleChange("firstName")}
                        name="firstName"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        id="name"
                        className="form-control"
                        placeholder="Please enter your lastname"
                        value={lastName}
                        onChange={handleChange("lastName")}
                        name="lastName"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your valid e-mail address"
                        value={email}
                        onChange={handleChange("email")}
                        name="email"
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

                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type={passwordShown ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password1}
                        onChange={handleChange("password1")}
                        name="password1"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type={confirmpasswordShown ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={handleChange("password2")}
                        name="password2"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter USDT address (BEP-20)..."
                        value={usdt_address}
                        onChange={handleChange("usdt_address")}
                        name="usdt_address"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter referral code (Optional)"
                        value={referralCode}
                        onChange={handleChange("referralCode")}
                        name="referralCode"
                      />
                    </div>
                  </div>

                  <p>
                    <small>
                      By registering you agree to our Conditions of Use & Sale.
                      Please see our Privacy Notice, our Cookies Notice and our
                      Interest-Based Ads Notice.
                    </small>
                  </p>
                  <div className="form-check">
                    <div className="slideThree">
                      <input
                        type="checkbox"
                        onClick={toggleRegisterVisiblity}
                        value="None"
                        id="slideThree"
                        name="check"
                      />
                      <label htmlFor="slideThree"></label>
                    </div>
                  </div>
                  {term_condition ? (
                    <button
                      type="submit"
                      onClick={register}
                      className="slide-btn login-btn"
                    >
                      {processing ? (
                        <div className="spinner" id="spinner"></div>
                      ) : (
                        <b>Register</b>
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled
                      className="register__registerButton"
                      style={{ backgroundColor: "#f1d690" }}
                    >
                      <b>Kindly agree to our Conditions of Use & Sale.</b>
                    </button>
                  )}
                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                  <div className="clearfix"></div>
                  <div className="clear"></div>
                  {/* <div className="separetor text-center">
                    <span>Or with Signup</span>
                  </div> */}
                  <div className="sign-icon">
                    <ul>
                      {/* <li>
                        <a className="facebook" href="#">
                          <i className="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a className="twitter" href="#">
                          <i className="ti-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a className="instagram" href="#">
                          <i className="ti-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a className="google" href="#">
                          <i className="ti-google"></i>
                        </a>
                      </li> */}
                    </ul>
                    <div className="acc-not">
                      Have an account? <Link to="/login">Login</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
