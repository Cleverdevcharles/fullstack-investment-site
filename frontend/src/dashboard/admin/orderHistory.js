import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getPurchaseHistory } from "../../functions/user";
import { isAuthenticated } from "../../functions/auth";
import { listOrders } from "../../functions/order";
import Header from "../../components/navs/header/Header";
import moment from "moment";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import SideBar from "./nav/SideBar";
import Footer from "./nav/Footer";
import PageArea from "./nav/PageArea";
import { API } from "../../config";

const History = () => {
  const [menu, setMenu] = useState(false);
  const [withdrawalRequest, setWithdrawalRequest] = useState(false);
  const [history, setHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [withdraw, setWithdraw] = useState("Withdraw");

  const currentHistory = useHistory();

  const loadOrders = () => {
    setLoading(true);
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setOrders(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const menu = window.localStorage.getItem("Menu");
    const withdrawalRequest = window.localStorage.getItem("Withdrawal Request");
    setMenu(JSON.parse(menu));
    setWithdrawalRequest(JSON.parse(withdrawalRequest));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Menu", JSON.stringify(menu));
    window.localStorage.setItem(
      "Withdrawal Request",
      JSON.stringify(withdrawalRequest)
    );
  });

  const handleWithdrawalRequest = () => {
    setWithdrawalRequest(menu ? false : true);
    toast.success("Withdrawal request sent...Please wait for your payment.");
  };

  const { user } = isAuthenticated();

  const token = isAuthenticated().token;

  const showInput = (key, value) => (
    <>
      <div>{key}</div>
      {value}
    </>
  );

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(user._id, token);
  }, []);

  var withdrawalCount;

  const withdrawalDate = () => {
    var today = new Date();
    var business_days = 14;

    var withdrawalDate = today;
    var total_days = business_days;
    for (var days = 1; days <= total_days; days++) {
      withdrawalDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
      // withdrawalDate.setDate(withdrawalDate.getDate() + parseInt(7));
      if (withdrawalDate.getDay() == 0 || withdrawalDate.getDay() == 6) {
        //it's a weekend day so we increase the total_days of 1
        total_days++;
        // counter+1
        if (total_days++) {
          withdrawalCount++;
        }
      }
    }
    // setCounter(counter + 1);
    console.log(today);
    console.log(withdrawalDate);
    return today.toLocaleDateString();
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_i18h2lq",
        "template_6dxivza",
        e.target,
        "user_UdgQW2uxRt0vdGCQzkK9Y"
      )
      .then((res) => {
        console.log(res);
        toast.success(
          "Withdrawal request sent...Please wait for your payment."
        );
        setTimeout(() => {
          setWithdraw("Withdraw");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Failed. Please try again.");
        setTimeout(() => {
          setWithdraw("Withdraw");
        }, 1000);
      });
  };

  const investmentHistory = (history) => {
    return (
      <>
        <ul id="autoWidth" className="cs-hidden">
          <div
          className="form-inner table-inner"
          style={{ overflowX: "auto" }}
          >
            <table
            style={{overFlow: "scroll", whiteSpace: "nowrap"}}
            >
              <tr
                style={{background: "#fc0077"}}
                className="text-white" >
                <th>Package ID</th>
                <th>Package Name</th>
                <th>Transaction ID</th>
                <th>Transaction Hash</th>
                <th>Currency Option</th>
                <th>Amount</th>
                <th>Interest</th>
                <th>Withdrawal</th>
              </tr>
              {history.map((h, i) => {
                return (
                  <tbody>
                    <tr key={i}>
                      {h.investmentpackages.map((ip, i) => {
                        return (
                          <>
                            <td>{ip._id}</td>
                            <td>{ip.name}</td>
                            <td>{h.transaction_id}</td>
                            <td>
                              <a
                                href={`https://bscscan.com/tx/${h.transaction_hash}`}
                                target="_blank"
                                className="text-white"
                                style={{textDecoration: "underline"}}
                              >
                                {h.transaction_hash}
                              </a>
                            </td>
                            <td>
                              {h.currency_option}
                            </td>
                            <td>${h.amount}</td>
                            <td>
                              {ip.percentage_interest}% ($
                              {Math.round(
                                (ip.percentage_interest * h.amount) / 100
                              )}
                              )
                            </td>

                            <td>
                              {h.withdrawalDate === withdrawalDate() ? (
                                <>
                                  <form onSubmit={sendMail}>
                                    <input
                                      type="text"
                                      name="name"
                                      style={{ display: "none" }}
                                      value={`${user.fullName}`}
                                    />
                                    <input
                                      type="text"
                                      name="email"
                                      style={{ display: "none" }}
                                      value={`${user.email}`}
                                    />
                                    <input
                                      type="text"
                                      name="message"
                                      style={{ display: "none" }}
                                      value={`New Withdrawal Request From ${
                                        user.fullName
                                      } with ID = ${
                                        user._id
                                      } for a withdrawal of $${Math.round(
                                        (ip.percentage_interest * h.amount) /
                                          100
                                      )}, 
                                      with a transaction ID = ${
                                        h.transaction_id
                                      }.
                                      Which is ${ip.percentage_interest}% of $${
                                        h.amount
                                      }.
                                      Please make payment and update your orders using this link
                                      ${API}/admin-investment-orders`}
                                    />
                                    {/* <div>{counter}</div> */}
                                    {h.status === "Not Verified" ? (
                                      <>
                                        <button disabled
                                          style={{ background: "transparent" }}>
                                          Not Verified
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        {withdrawalRequest ? (
                                          <>Request Sent</>
                                        ) : (
                                          <button
                                            type="submit"
                                            className="form-control"
                                            // onClick={handleWithdrawalRequest}
                                            disabled={
                                              h.status === "Paid" ? true : false
                                            }
                                            style={
                                              h.status === "Paid"
                                                ? { backgroundColor: "gray" }
                                                : {
                                                    background: "green",
                                                    color: "#fff",
                                                  }
                                            }
                                          >
                                            {h.status === "Paid" ? (
                                              <>Paid</>
                                            ) : (
                                              <span>{withdraw}</span>
                                            )}
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </form>
                                </>
                              ) : (
                                  <>
                                    {h.status === "Verified" ?
                                      <>
                                      {h.withdrawalDate}
                                      </>
                                      :
                                      <>
                                      {h.status}
                                      </>
                                    }
                                    
                                  </>
                              )}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </ul>
      </>
    );
  };

  const formatCalendarDate = (dateTime) => {
    return moment.utc(dateTime).format("LLL");
  };

  const getWithdrawalDate = (dateIn) => {
    var today = new Date();
    var business_days = 14;

    var withdrawalDate = today;
    var total_days = business_days;
    for (var days = 1; days <= total_days; days++) {
      withdrawalDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      var confirmWithdrawalDate = new Date(
        today.getTime() + days * 24 * 60 * 60 * 1000
      );
      // withdrawalDate.setDate(withdrawalDate.getDate() + parseInt(7));
      if (withdrawalDate.getDay() == 0 || withdrawalDate.getDay() == 6) {
        //it's a weekend day so we increase the total_days of 1
        total_days++;
      }
    }
    console.log(today);
    console.log(withdrawalDate);

    return today.toLocaleDateString();
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
                <div className="send-money-form transection-log">
                  <div className="form-text">
                    {loading ? (
                      <h3>Loading Investments, please wait....</h3>
                    ) : (
                      <>
                        <h3>Investments</h3>
                      </>
                    )}
                    {investmentHistory(history)}
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

export default History;
