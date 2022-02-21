import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../../../config";
import { isAuthenticated, signout } from "../../../functions/auth";
import { getSites, list } from "../../apiCore";
import Site from "../../card/Site";

function Header() {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showlogout, setShowLogout] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);
  const [sitesByArrival, setSitesByArrival] = useState([]);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [
    isScrollValueMoreThanHeaderHeight,
    setIsScrollValueMoreThanHeaderHeight,
  ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollValueMoreThanHeaderHeight(window.scrollY > 96);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const history = useHistory();

  const { user } = isAuthenticated();
  const toggleMenu = () => {
    setMenu(menu ? false : true);
  };

  const loadSitesByArrival = () => {
    getSites("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setSitesByArrival(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
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

  const dashboard = () => {
    if (user.role === "Admin") {
      history.push("/investment-history");
      window.location.reload();
    } else {
      history.push("/investment-history");
      window.location.reload();
    }
  };
  return (
    <>
      {sites.map((s, i) => (
        <header className="header-one" key={i}>
          <div className="topbar-area">
            <div className="container">
              <div className="row">
                <div className=" col-md-8 col-sm-8 col-xs-12">
                  <div className="topbar-left">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-envelope"></i> {s.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                  <div className="topbar-right">
                    {/* <select className="select d-inline-block">
                    <option>Eng</option>
                    <option>Esp</option>
                    <option>Fra</option>
                    <option>Deu</option>
                  </select> */}
                    <ul>
                      {user ? (
                        <li>
                          <a className="text-white">
                            <img src="img/icon/login.png" alt=""  />
                            {user.fullName}
                          </a>
                        </li>
                      ) : (
                        <li>
                          <Link to="/login" className="text-white">
                            <img src="img/icon/login.png" alt="" />
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="sticker "
            className={
              isScrollValueMoreThanHeaderHeight
                ? "header-menu-area header-area stick"
                : "header-menu-area header-area "
            }
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-3 d-flex align-items-center">
                  <div className="logo">
                    <Link to="/">
                      <img
                        src={`${BACKEND_API}/site/logo/${s._id}`}
                        alt={s.name}
                        width="100px"
                        height="60px"
                        style={{objectFit: "cover"}}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-9">
                  <div className="header-right">
                    {user ? (
                      <a
                        onClick={() => {
                          signout(() => {
                            toast.success("Signout Successfully");
                            history.push("/");
                          });
                        }}
                        className="hd-btn logout text-white"
                        style={
                          isScrollValueMoreThanHeaderHeight
                            ? { cursor: "pointer", marginTop: "10px" }
                            : { cursor: "pointer" }
                        }
                      >
                        Logout
                      </a>
                    ) : (
                        <Link to="/register" className="hd-btn register text-white"
                        style={
                          isScrollValueMoreThanHeaderHeight
                            ? { cursor: "pointer", marginTop: "10px" }
                            : { cursor: "pointer" }
                        }
                        >
                        Signup
                      </Link>
                    )}
                  </div>
                  <div className="header_menu f-right">
                    <nav id="mobile-menu">
                      <ul className="main-menu"
                      style={
                          isScrollValueMoreThanHeaderHeight
                            ? { cursor: "pointer", marginTop: "2px" }
                            : { cursor: "pointer" }
                        }
                      >
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        {user ? (
                          <li>
                            <Link to="#" onClick={dashboard}>
                              Dashboard
                            </Link>
                          </li>
                        ) : null}
                        <li>
                          <Link to="/investment">Investment</Link>
                        </li>
                        <li>
                          <Link to="/about">About us</Link>
                        </li>
                        <li className="contact">
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                          <Link to="/reviews">Reviews</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-md-12">
                  <a
                    onClick={toggleMenu}
                    className="hd-btn bars text-white"
                    style={
                      isScrollValueMoreThanHeaderHeight
                        ? { cursor: "pointer", marginTop: "-60px" }
                        : { cursor: "pointer" }
                    }
                  >
                    {menu ? (
                      <span className="text-white">X</span>
                    ) : (
                      <i class="fas fa-bars"></i>
                    )}
                  </a>
                  <div
                    className="mobile-menu"
                    style={menu ? { display: "block" } : { display: "none" }}
                  >
                    <ul
                      className="main-menu"
                      style={
                        isScrollValueMoreThanHeaderHeight
                          ? null
                          : { marginTop: "20px" }
                      }
                    >
                      <div className="line"></div>
                      <li onClick={toggleMenu}>
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <div className="line"></div>
                      {user ? (
                      <li onClick={toggleMenu}>
                          <Link to="#" className="nav-link" onClick={dashboard}>
                            Dashboard
                          </Link>
                        </li>
                      ) : null}
                      <div className="line"></div>
                      <li onClick={toggleMenu}>
                        <Link to="/investment" className="nav-link">
                          Investment
                        </Link>
                      </li>
                      <div className="line"></div>
                      <li onClick={toggleMenu}>
                        <Link to="/about" className="nav-link">
                          About us
                        </Link>
                      </li>
                      <div className="line"></div>
                      <li className="contact"
                      onClick={toggleMenu}
                      >
                        <Link to="/contact" className="nav-link">
                          Contact Us
                        </Link>
                      </li>
                      <div className="line"></div>
                      <li onClick={toggleMenu}>
                        <Link to="/reviews" className="nav-link">
                          Reviews
                        </Link>
                      </li>
                      <li>
                        {user ? 
                        <Link to="#" className="nav-link text-white" onClick={toggleMenu}>
                        <a
                          onClick={() => {
                            signout(() => {
                              toast.success("Signout Successfully");
                              history.push("/");
                            });
                          }}
                          className="hd-btn text-white"
                          style={{ cursor: "pointer" }}
                        >
                          Logout
                        </a>
                      </Link>
                        :
                        <Link to="/register" className="nav-link text-white" onClick={toggleMenu}>
                          <a
                            className="hd-btn text-white"
                            style={{ cursor: "pointer" }}
                          >
                            Sign Up
                          </a>
                        </Link>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      ))}
    </>
  );
}

export default Header;
