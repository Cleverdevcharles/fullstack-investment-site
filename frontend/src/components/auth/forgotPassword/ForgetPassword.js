import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../../../config";
import { isAuth } from "../../../helpers/auth";
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import "./ForgetPassword.css";

const ForgetPassword = ({ history }) => {
  // const [data, setData] = useState({
  //   categories: [],
  //   category: "",
  //   search: "",
  //   results: [],
  //   searched: false,
  // });
  // const [sitesByArrival, setSitesByArrival] = useState([]);
  // const [sites, setSites] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;
  const [processing, setProcessing] = useState("");
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    if (email) {
      axios
        .put(`${BACKEND_API}/forgotpassword`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
          });
          console.log(res.data);
          toast.success(res.data.message);
          setProcessing(false);
        })
        .catch((err) => {
          if (err.response.data.errors === "Must be a valid email address") {
            toast.error("Your email address is badly formatted.");
            console.log(err.response);
          } else {
            toast.error(err.response.data.error);
            console.log(err.response);
          }
        });
      setProcessing(false);
    } else {
      toast.error("Please provide your verified email address.");
      setProcessing(false);
    }
  };

  // const loadCategories = () => {
  //   getCategories().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setData({ ...data, categories: data });
  //     }
  //   });
  // };

  // const loadSitesByArrival = () => {
  //   getSites("createdAt").then((data) => {
  //     console.log(data);
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setSitesByArrival(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadCategories();
  //   loadSitesByArrival();
  // }, []);

  // const loadSites = () => {
  //   getSites().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       setSites(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadSites();
  // }, []);

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="login-area area-padding fix" style={{ height: "100vh" }}>
        <div className="login-overlay"></div>
        <div className="container mt-5">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-6 col-lg-6 col-md-8">
              <div className="login-form">
                <h4 className="login-title text-center">Forgot Password</h4>
                <form id="contactForm" className="log-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="name"
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    placeholder="Please enter your verified email"
                  />
                  <button type="submit" id="submit" className="slide-btn login-btn">
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      <b>Submit</b>
                    )}
                  </button>

                  <div className="acc-not">
                    Don't have an account? <Link to="/register">Signup</Link>
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

export default ForgetPassword;
