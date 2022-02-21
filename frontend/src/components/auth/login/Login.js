import axios from "axios";
import React, { useEffect, useState } from "react";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API, FACEBOOK_CLIENT, GOOGLE_CLIENT } from "../../../config";
import { authenticate, isAuthenticated, signin } from "../../../functions/auth";
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
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
  const [processing, setProcessing] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { user } = isAuthenticated();
  const history = useHistory();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const { email, password1 } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId) => {
    setGoogleLoading(true);
    axios
      .post(`${BACKEND_API}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
        setGoogleLoading(false);
      })
      .catch((error) => {
        setGoogleLoading(false);
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };

  const informParent = (response) => {
    authenticate(response, () => {});
  };

  // const sendFacebookToken = (userID, accessToken) => {
  //   setFacebookLoading(true);
  //   axios
  //     .post(`${BACKEND_API}/facebooklogin`, {
  //       userID,
  //       accessToken,
  //     })
  //     .then((res) => {
  //       setFacebookLoading(false);
  //       console.log(res.data);
  //       informParent(res);
  //     })
  //     .catch((error) => {
  //       console.log("FACEBOOK SIGNIN ERROR", error.response);
  //       setFacebookLoading(false);
  //     });
  // };

  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  // const responseFacebook = (response) => {
  //   console.log(response);
  //   sendFacebookToken(response.userID, response.accessToken);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!email && !password1) {
      toast.error("Please fill out all field.");
      setProcessing(false);
      return;
    }
    if (!email) {
      toast.error("Please provide your valid email address.");
      setProcessing(false);
      return;
    }
    if (!password1) {
      toast.error("Please provide your valid password.");
      setProcessing(false);
      return;
    }
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });

      signin({ email, password: password1 }).then((data) => {
        if (data.error) {
          console.log(data.error);
          toast.error(data.error);
          setProcessing(false);
        } else {
          authenticate(data, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
            });
            setProcessing(false);
            user && user.role === "admin"
              ? history.push("/")
              : history.push("/");
            toast.success(`Hey ${data.user.fullName}, Welcome back!`);
            console.log(data.user);
          });
        }
      });
    } else {
      toast.error("E-mail and Password do not match.");
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
      {user ? <Redirect to="/" /> : null}
      <div className="login-area area-padding fix" style={{height: "100vh"}}>
        <div className="login-overlay"></div>
        <div className="container">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-6 col-lg-6 col-md-8">
              <div className="login-form">
                <h4 className="login-title text-center">Login</h4>
                <form id="contactForm" className="log-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="name"
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    placeholder="Please enter your verified email"
                  />
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    value={password1}
                    onChange={handleChange("password1")}
                    placeholder="Enter your password"
                  />
                  <div className="check-group">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" value="" />
                        Remember me
                      </label>
                    </div>
                    <Link className="text-muted" to="/users-password-forget">
                      Forgot password?
                    </Link>
                  </div>
                  <button type="submit" id="submit" className="slide-btn login-btn">
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      <b>Login</b>
                    )}
                  </button>
                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                  <div className="clearfix"></div>
                  <div className="clear"></div>
                  {/* <div className="separetor text-center">
                    <span>Or with Login</span>
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
                      Don't have an account? <Link to="/register">Signup</Link>
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

export default Login;
