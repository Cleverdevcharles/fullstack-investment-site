import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";
import Footer from "../nav/Footer";
import Header from "../../../components/navs/header/Header";
import { isAuthenticated } from "../../../functions/auth";
import { getInvestmentPackages } from "../../../functions/investmentpackage";
import { updateSite, getSite } from "../../../functions/site";


const UpdateSite = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    about: "",
    email: "",
    terms_conditions: "",
    facebook_url: "",
    whatsapp_url: "",
    instagram_url: "",
    twitter_url: "",
    phone: "",
    logo: "",
    createdSite: "",
    redirectToProfile: false,
    formData: "",
  });

  const [investmentpackages, setInvestmentPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();
  const {
    name,
    about,
    email,
    facebook_url,
    whatsapp_url,
    instagram_url,
    twitter_url,
    phone,
    terms_conditions,
    logo,
    createdSite,
    redirectToProfile,
    formData,
  } = values;

  const init = (siteId) => {
    getSite(siteId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          about: data.about,
          email: data.email,
          terms_conditions: data.terms_conditions,
          facebook_url: data.facebook_url,
          whatsapp_url: data.whatsapp_url,
          instagram_url: data.instagram_url,
          twitter_url: data.twitter_url,
          phone: data.phone,
          formData: new FormData(),
        });
        // load categories
        initInvestmentPackages();
      }
    });
  };

  // load categories and set form data
  const initInvestmentPackages = () => {
    getInvestmentPackages().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setInvestmentPackages(data);
      }
    });
  };

  useEffect(() => {
    initInvestmentPackages();
    init(match.params.siteId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "logo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setValues({ ...values });

    if (!name) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site name is required.");
      }, 1000);
      return;
    }
    if (name.length > 32) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site name is long, should be between 2 to 32 characters.");
      }, 1000);
      return;
    }
    if (name.length <= 2) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Site name is short, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (!email) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site's email is required. ");
      }, 1000);
      return;
    }
    if (!terms_conditions) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Terms and Conditions is required.");
      }, 1000);
      return;
    }
    if (terms_conditions.length <= 20) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Terms and Conditions is short, should be between 20 characters to 2000 characters."
        );
      }, 1000);
      return;
    }
    if (!about) {
      setTimeout(() => {
        setLoading(false);
        toast.error("About site is required. ");
      }, 1000);
      return;
    }
    if (about.length <= 20) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "About site is short, should be between 20 characters to 1000 characters."
        );
      }, 1000);
      return;
    }
    if (about.length > 2000) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "About site is long, should be between 20 characters to 1000 characters."
        );
      }, 1000);
      return;
    }

    if (!phone) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Please site's phone number is required.");
      }, 1000);
      return;
    }
    updateSite(match.params.siteId, user._id, token, formData).then((data) => {
      if (data.error) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        console.log(data);
      } else {
        setLoading(true);
        setLoading(false);
        toast.success(`Site updated successfully.`);
        setValues({
          ...values,
          name: "",
          about: "",
          email: "",
          facebook_url: "",
          whatsapp_url: "",
          instagram_url: "",
          twitter_url: "",
          phone: "",
          terms_conditions: "",
          amazon_url: "",
          logo: "",
          createdSite: data.name,
        });
      }
    });
  };



  return (
    <>
      <Header />
      <main>
        <PageArea />
        <div class="notify-overlay"></div>
        <div class="notify-overlay"></div>
        <div class="dsahboard-area bg-color area-padding">
          <div class="container">
            <div class="row">
              <SideBar />
              <div class="col-xl-9 col-lg-9 col-md-8">
                <div className="login-area area-padding fix">
                  <div className="login-overlay"></div>
                  <div className="container">
                    <div className="row justify-content-center text-center ">
                      <div className="col-xl-8 col-lg-10 col-md-10">
                        <div className="login-form signup-form">
                          <h4 className="login-title text-center">
                            Update Site Details
                          </h4>
                          <form
                            id="contactForm"
                            className="log-form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                  style={{ float: "left" }}
                                >
                                  Uplaod Logo
                                </label>
                                <input
                                  onChange={handleChange("logo")}
                                  type="file"
                                  accept="image/*"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                  style={{ float: "left" }}
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  placeholder="Enter your site's name..."
                                  onChange={handleChange("name")}
                                  value={name}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                  style={{ float: "left" }}
                                >
                                  E-mail
                                </label>
                                <input
                                  type="email"
                                  style={{ width: "100%" }}
                                  className="form-control"
                                  onChange={handleChange("email")}
                                  value={email}
                                  placeholder="Enter your site's email address..."
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                  style={{ float: "left" }}
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your site's phone number"
                                  className="form-control"
                                  value={phone}
                                  onChange={handleChange("phone")}
                                  value={phone}
                                />
                              </div>
                            </div>
                            <div>
                              <div>
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                  style={{ float: "left" }}
                                >
                                  About
                                </label>
                                <textarea
                                  style={{
                                    width: "100%",
                                    color: "gray",
                                    backgroundColor: "transparent",
                                    padding: "5px",
                                  }}
                                  placeholder="Write about your site..."
                                  onChange={handleChange("about")}
                                  value={about}
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div>
                              <div>
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                >
                                  Terms and Conditions
                                </label>
                                <textarea
                                  style={{
                                    width: "100%",
                                    color: "gray",
                                    backgroundColor: "transparent",
                                    padding: "5px",
                                  }}
                                  placeholder="Write about your site's terms and conditions..."
                                  onChange={handleChange("terms_conditions")}
                                  value={terms_conditions}
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                >
                                  Facebook Link
                                </label>

                                <input
                                  onChange={handleChange("facebook_url")}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={facebook_url}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                >
                                  WhatsApp Link
                                </label>
                                <input
                                  onChange={handleChange("whatsapp_url")}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={whatsapp_url}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                >
                                  Twitter Link
                                </label>
                                <input
                                  onChange={handleChange("twitter_url")}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={twitter_url}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left" }}
                                >
                                  Instagram Link
                                </label>
                                <input
                                  onChange={handleChange("instagram_url")}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={instagram_url}
                                />
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

export default UpdateSite;
