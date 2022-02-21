import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";
import Footer from "../nav/Footer";
import Header from "../../../components/navs/header/Header";
import { isAuthenticated } from "../../../functions/auth";
import { deleteSite, getSites } from "../../../functions/site";

const Manage__Sites = ({ history }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { user, token } = isAuthenticated();
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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

  const destroy = (siteId) => {
    deleteSite(siteId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success(`${data.message}`);
        loadSites();
      }
    });
  };

  useEffect(() => {
    loadSites();
  }, []);

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
                <div class="send-money-form transection-log">
                  <div class="form-text">
                    {loading ? (
                      <h3>Loading Site Detials, please wait....</h3>
                    ) : (
                      <>
                        {sites.length > 1 ? (
                          <h3>Total {sites.length} sites, please delete 1.</h3>
                        ) : (
                          <h3>Total {sites.length} site</h3>
                        )}
                      </>
                    )}
                    <div class="form-inner table-inner">
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <td>
                              <strong>ID</strong>
                            </td>
                            <td>
                              <strong>NAME</strong>
                            </td>
                            <td>
                              <strong>EMAIL</strong>
                            </td>
                            <td>
                              <strong>PHONE</strong>
                            </td>

                            <td className="list__item__edit">
                              <strong>EDIT</strong>
                            </td>
                            <td className="list__item__delete">
                              <strong>DELETE</strong>
                            </td>
                          </tr>
                        </thead>
                        {sites.filter(searched(keyword)).map((s, i) => (
                          <tbody key={i}>
                            <tr>
                              <td>
                                <b>{s._id}</b>
                              </td>
                              <td>
                                <b>{s.name}</b>
                              </td>
                              <td>
                                <b>{s.email}</b>
                              </td>
                              <td>
                                <b>
                                  {!s.phone ? <>No phone number</> : s.phone}
                                </b>
                              </td>

                              <td>
                                <b>
                                  <Link to={`/admin-site-update-${s._id}`}>
                                    <center>
                                      <span className="fas fa-edit"></span>
                                    </center>
                                  </Link>
                                </b>
                              </td>
                              <td onClick={() => destroy(s._id)}>
                                {loading ? (
                                  <div></div>
                                ) : (
                                  <b>
                                    <center>
                                      <span className="fas fa-trash"></span>
                                    </center>
                                  </b>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      {sites.map((s, i) => (
                        <div key={i}>
                          <div>
                            <br />
                            <label
                              className="text-muted"
                              style={{ float: "left" }}
                            >
                              ABOUT
                            </label>
                            <textarea
                              value={s.about}
                              style={{
                                width: "100%",
                                color: "gray",
                                backgroundColor: "transparent",
                                padding: "5px",
                              }}
                              rows="10"
                            ></textarea>
                          </div>
                          <div>
                            <br />
                            <label
                              className="text-muted"
                              style={{ float: "left" }}
                            >
                              TERMS AND CONDITIONS
                            </label>
                            <textarea
                              style={{
                                width: "100%",
                                color: "gray",
                                backgroundColor: "transparent",
                                padding: "5px",
                              }}
                              rows="10"
                              value={s.terms_conditions}
                            ></textarea>
                          </div>
                        </div>
                      ))}
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

export default Manage__Sites;
