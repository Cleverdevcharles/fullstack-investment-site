import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../../../config";
import { isAuth } from "../../../helpers/auth";
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import "./ResetPassword.css";

const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
  });
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
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [processing, setProcessing] = useState("");

  const { password1, password2, token } = formData;
  const history = useHistory();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmpasswordShown ? false : true);
  };

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, []);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    setProcessing(true);
    e.preventDefault();
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
    const strongRegexSpecialCharacter = /^(.*\W).*$/;
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

    axios
      .put(`${BACKEND_API}/resetpassword`, {
        newPassword: password1,
        resetPasswordLink: token,
      })
      .then((res) => {
        console.log(res.data.message);
        setFormData({
          ...formData,
          password1: "",
          password2: "",
        });
        setProcessing(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setProcessing(false);
        console.log(err.response.data.error);
      });
  };

  // const login = () => {
  //   history.push("/login");
  //   window.location.reload();
  // };

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
      <div className="login-area area-padding fix" style={{height: "100vh"}}>
        <div className="login-overlay"></div>
        <div className="container mt-5">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-6 col-lg-6 col-md-8">
              <div className="login-form">
                <h4 className="login-title text-center">Reset Password</h4>
                <form
                  id="contactForm"
                  className="log-form"
                  onSubmit={handleSubmit}
                >
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    value={password1}
                    onChange={handleChange("password1")}
                    placeholder="Enter your password"
                  />
                  <input
                    type={confirmpasswordShown ? "text" : "password"}
                    className="form-control"
                    value={password2}
                    onChange={handleChange("password2")}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="submit"
                    id="submit"
                    onClick={handleSubmit}
                    className="slide-btn login-btn"
                  >
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      <b>Reset</b>
                    )}
                  </button>
                  <div className="acc-not">
                    Can remember password? <Link to="/login">Signin</Link>
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

export default ResetPassword;
