import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../../../config";
import { isAuth } from "../../../helpers/auth";
import { getCategories, getSites } from "../../apiCore";
import Site from "../../card/Site";
import "./ChangePassword.css";

const ChangePassword = ({ history }) => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;
  const [processing, setProcessing] = useState("");
  const [sitesByArrival, setSitesByArrival] = useState([]);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    if (email) {
      axios
        .put(`${BACKEND_API}/changepassword`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
          });
          toast.success(`Please check your email for password reset link.`);
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
      toast.error("Please provide your valid email address.");
      setProcessing(false);
    }
  };


  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  const loadSitesByArrival = () => {
    getSites("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setSitesByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadCategories();
    loadSitesByArrival();
  }, []);

  const loadSites = () => {
    getSites().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setSites(data);
      }
    });
  };

  useEffect(() => {
    loadSites();
  }, []);

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="changePassword">
        <Link to="/">
          {sitesByArrival.map((site, i) => (
            <div key={i} className="header__logo">
              <Site site={site} />
            </div>
          ))}
        </Link>
        <div className="changePassword__container">
          <center>
            <h3>Change Password</h3>
          </center>
          <hr />

          <form onSubmit={handleSubmit}>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={handleChange("email")}
              placeholder="Enter you email address here..."
              className="w-full px-8 py-3 rounded-lg pl-3 pr-3 pb-1 formInput
                  bg-gray-100 border border-gray-200 placeholder-gray-500
                  text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />

            <button type="submit" className="changePassword__signInButton py-1">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                <b>Submit</b>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
