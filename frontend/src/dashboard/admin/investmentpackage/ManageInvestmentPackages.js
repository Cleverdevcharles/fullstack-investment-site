import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteInvestmentPackage,
  getInvestmentPackages,
} from "../../../functions/investmentpackage";
import { isAuthenticated } from "../../../functions/auth";
import Header from "../../../components/navs/header/Header";
import Footer from "../nav/Footer";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";

const ManageInvestmentPackages = () => {
  const [investmentpackages, setInvestmentPackages] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchform, setSearchForm] = useState("");

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const loadInvestmentPackages = () => {
    setLoading(true);
    getInvestmentPackages().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setInvestmentPackages(data);
        setLoading(false);
      }
    });
  };

  const destroy = (investmentpackageId) => {
    setLoading(true);
    deleteInvestmentPackage(investmentpackageId, user._id, token).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          toast.success(`${data.message}`);
          console.log(data);
          loadInvestmentPackages();
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    loadInvestmentPackages();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                <div className="send-money-form transection-log">
                  <div className="form-text">
                    {loading ? (
                      <h3>Loading Investment Packages, please wait....</h3>
                    ) : (
                      <>
                        {investmentpackages.length > 1 ? (
                          <h3>
                            Total {investmentpackages.length} Investment
                            Packages
                          </h3>
                        ) : (
                          <h3>
                            Total {investmentpackages.length} Investment Package
                          </h3>
                        )}
                      </>
                    )}
                    <div className="form-inner table-inner">
                      <table>
                        <thead>
                          <tr>
                            <td>
                              <strong>PACKAGE NAME</strong>
                            </td>
                            <td>
                              <strong>MIN AMOUNT</strong>
                            </td>
                            <td>
                              <strong>MAX AMOUNT</strong>
                            </td>
                            <td>
                              <strong>INTEREST (%)</strong>
                            </td>
                            <td>
                              <strong>DURATION</strong>
                            </td>
                            <td className="list__item__edit">
                              <strong>EDIT</strong>
                            </td>
                            <td className="list__item__delete">
                              <strong>DELETE</strong>
                            </td>
                          </tr>
                        </thead>
                        {investmentpackages
                          .filter(searched(keyword))
                          .map((ip, i) => (
                            <tbody key={i}>
                              <tr>
                                <td>
                                  <b>{ip.name}</b>
                                </td>
                                <td>
                                  <b>${ip.minimum_amount}</b>
                                </td>
                                <td>
                                  <b>${ip.maximum_amount}</b>
                                </td>
                                <td>
                                  <b>{ip.percentage_interest}%</b>
                                </td>
                                <td>
                                  {ip.duration == 7 ? (
                                    <b>Weekly</b>
                                  ) : (
                                    <b>Monthly</b>
                                  )}
                                </td>
                                <td>
                                  <b>
                                    <Link
                                      to={`/admin-update-investment-package-${ip._id}`}
                                    >
                                      <center>
                                        <span className="fas fa-edit"></span>
                                      </center>
                                    </Link>
                                  </b>
                                </td>
                                <td onClick={() => destroy(ip._id)}>
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

export default ManageInvestmentPackages;
