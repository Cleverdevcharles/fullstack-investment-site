import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "../apiCore";
import { emptyCart } from "../cart/cartHelpers";
import InvestmentCard from "../card/InvestmentCard";
import { isAuthenticated } from "../../functions/auth";
import { Link, useHistory } from "react-router-dom";
// import "braintree-web"; // not using this package
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { getCart } from "../cart/cartHelpers";
import transactionId from "react-use-uuid";
import CryptoPaymentForm, { CHAIN_IDS, CRYPTO_IN_USD, MAXIMUM_DECIMAL_PLACES } from './CryptoPaymentForm';
import { Radio } from 'antd';
import { BTC_ADDRESS, USDT_ADDRESS, BNB_ADDRESS, ETH_ADDRESS } from "../../config";
import 'antd/dist/antd.css';


const currencyOptions = [
  {
      name: CHAIN_IDS.TETHER.NAME,
      value: CHAIN_IDS.TETHER.CURRENCY_CODE,
      network: "TRC20",
      address: USDT_ADDRESS,
  },
  {
    name: CHAIN_IDS.BITCOIN.NAME,
    value: CHAIN_IDS.BITCOIN.CURRENCY_CODE,
    network: "BTC",
    address: BTC_ADDRESS,
  },
  {
    name: CHAIN_IDS.BINANCE.NAME,
    value: CHAIN_IDS.BINANCE.CURRENCY_CODE,
    network: "BEP20",
    address: BNB_ADDRESS,
  },
  {
    name: CHAIN_IDS.ETHEREUM.NAME,
    value: CHAIN_IDS.ETHEREUM.CURRENCY_CODE,
    network: "ETH",
    address: BTC_ADDRESS,
  },
]

const networkOptions = [
  {
    value: "mainnet",
  }
]

const Checkout = ({
  investmentpackages,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });
  const [items, setItems] = useState([]);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [currency, setCurrency] = useState(currencyOptions[0].value);
  const [network, setNetwork] = useState(networkOptions[0].value)
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleProceedToPayment = () => {
    setProceedToPayment(proceedToPayment ? false : true);
  };
  const history = useHistory();
  const {user} = isAuthenticated();
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  useEffect(() => {
    setItems(getCart());
  }, [run]);
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return investmentpackages.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * amount;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/login">
        <button className="btn" style={{ backgroundColor: "#f09d51" }}>
          Sign in to invest
        </button>
      </Link>
    );
  };

  const selectNetwork = (
    <Radio.Group value={network} style={{display: "none"}} onChange={event => setNetwork(event.target.value)} optionType="button" buttonStyle="solid" className="mb-3">
      {networkOptions.map(currencyOption => (<Radio.Button key={currencyOption.value} value={currencyOption.value}>{currencyOption.value}</Radio.Button>))}
    </Radio.Group>
  )

  let deliveryAddress = data.address;
const transId = transactionId();
  const invest = (e) => {
    e.preventDefault();
    if (!transactionHash) {
      toast.error("Please provide your transaction hash.");
      return;
    }
    const createOrderData = {
      investmentpackages: investmentpackages,
      transaction_id: transId.slice(2, 10),
      transaction_hash: transactionHash,
      currency_option: currency,
      investor: user.fullName,
      amount: getTotal(investmentpackages),
      withdrawalDate: getWithdrawalDate(),
    };
    createOrder(userId, token, createOrderData)
      .then((response) => {
        emptyCart(() => {
          setRun(!run); // run useEffect in parent Cart
          setData({
            loading: false,
            success: true,
          });
        });
        toast.success(`Thanks! Your payment of $${amount} was successful!`);
        setTimeout(() => {
          history.push('/investment')
        }, 5000)
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false });
      });
  }

  const selectCurrency = (
    <Radio.Group value={currency} className="mt-5"  onChange={event => setCurrency(event.target.value)} optionType="button" buttonStyle="solid" className="mb-3">
      {currencyOptions.map(currencyOption => (
        <Radio.Button key={currencyOption.value}
        className="currencyOption"
        style={{background: "#000", marginTop: "20px", color: "#fff"}}
          value={currencyOption.value}>{currencyOption.name}
        </Radio.Button>))}
    </Radio.Group>
  )

  // const buy = () => {
  //   setData({ loading: true });
  //   // send the nonce to your server
  //   // nonce = data.instance.requestPaymentMethod()
  //   let nonce;
  //   let getNonce = data.instance
  //     .requestPaymentMethod()
  //     .then((data) => {
  //       // console.log(data);
  //       nonce = data.nonce;
  //       // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
  //       // and also total to be charged
  //       // console.log(
  //       //     "send nonce and total to process: ",
  //       //     nonce,
  //       //     getTotal(investmentpackages)
  //       // );
  //       const paymentData = {
  //         paymentMethodNonce: nonce,
  //         amount: getTotal(investmentpackages),
  //       };

  //       processPayment(userId, token, paymentData)
  //         .then((response) => {
  //           console.log(response);
  //           // empty cart
  //           // create order

  //           const createOrderData = {
  //             investmentpackages: investmentpackages,
  //             transaction_id: response.transaction.id,
  //             amount: response.transaction.amount,
  //             address: deliveryAddress,
  //             withdrawalDate: getWithdrawalDate(),
  //           };

  //           createOrder(userId, token, createOrderData)
  //             .then((response) => {
  //               emptyCart(() => {
  //                 setRun(!run); // run useEffect in parent Cart
  //                 console.log("payment success and empty cart");
  //                 setData({
  //                   loading: false,
  //                   success: true,
  //                 });
  //               });
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               setData({ loading: false });
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setData({ loading: false });
  //         });
  //     })
  //     .catch((error) => {
  //       // console.log("dropin error: ", error);
  //       setData({ ...data, error: error.message });
  //     });
  // };

  const getWithdrawalDate = () => {
    var date = new Date();
    var eWD = date;
    eWD = new Date(
      Date.now() + investmentpackages[0].duration * 24 * 60 * 60 * 1000
    );
    return eWD.toLocaleDateString();
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && investmentpackages.length > 0 ? (
        <div>
          {items.map((investmentpackage, ip) => (
            <div
              className="gorm-group mb-3"
              style={proceedToPayment ? { display: "none" } : null}
            >
              {selectCurrency}<br/>
              {selectNetwork}<br/>
              <label className="text-muted">Amount</label>
              <input
                key={ip}
                className="form-control"
                type="number"
                min={investmentpackage.minimum_amount}
                max={investmentpackage.maximum_amount}
                placeholder={`Enter amount ($${investmentpackage.minimum_amount} - $${investmentpackage.maximum_amount})`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-white" style={{float: "left"}}>
                {!amount ?
                  `$ 0 = ${currency} 0`
                  :
                  <>
                    ${amount.toLocaleString('en-ca', { style: 'currency', currency: "CAD" })}{' '}
                    {' '}={' '}
                    {currency === CHAIN_IDS.TETHER.CURRENCY_CODE ?
                      <>({currency} {(amount / CRYPTO_IN_USD[currency])})</>
                      :
                      <>({currency} {(amount / CRYPTO_IN_USD[currency]).toFixed(MAXIMUM_DECIMAL_PLACES)})</>
                    }
                  </>
                }
                </span>
              <input
                key={ip}
                className="form-control"
                type="text"
                value={getWithdrawalDate()}
                style={{ display: "none" }}
              />
            </div>
          ))}
          {/* <div className="gorm-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div> */}

          {items.map((investmentpackage, ip) => (
            <>
              <>
                {amount >= investmentpackage.minimum_amount ? null : (
                  <>
                    <>
                      <div className="mt-5">
                      {amount < investmentpackage.maximum_amount ? (
                      <h6 className="alert alert-danger
                      text-dark text-left">
                        <b>❌ Enter valid amount to continue...</b>
                      </h6>
                    ) : null}
                    </div>
                    </>
                  </>
                )}
              </>
              {amount < investmentpackage.minimum_amount ? null : (
                <>
                  {amount > investmentpackage.maximum_amount ?
                    <div className="mt-5">
                      <h6 className="alert alert-danger
                      text-dark text-left"><b>❌ Your input is greater than maximum investment amount...</b></h6>
                    </div> : (
                    <>
                      {proceedToPayment ? (
                        <div>
                          <>
                    {currency === CHAIN_IDS.TETHER.CURRENCY_CODE ?
                        <>
                          <label className="mb-2" >
                          Send ${amount}{" "}
                          worth of {currency} to
                          this {currency}{" "}
                          wallet address (Network = TRC20) then
                          come back and click on "I HAVE PAID".
                        </label>
                        <input
                        className="form-control col-12 mb-4"
                        name="address"
                        disabled
                        value={USDT_ADDRESS}						
                        />
                        </>
                        :
                        null
                      }
                      <>
                      {currency === CHAIN_IDS.BITCOIN.CURRENCY_CODE ?
                        <>
                          <label className="mb-2" >
                          Send ${amount}{" "}
                          worth of {currency} to
                          this {currency}{" "}
                          wallet address (Network = BTC) then
                          come back and click on "I HAVE PAID".
                        </label>
                        <input
                        className="form-control col-12 mb-4"
                        name="address"
                        disabled
                        value={BTC_ADDRESS}						
                        />
                        </>
                        :
                        null
                    }
                    </>
                    <>
                      {currency === CHAIN_IDS.BINANCE.CURRENCY_CODE ?
                        <>
                        <label className="mb-2" >
                          Send ${amount}{" "}
                          worth of {currency} to
                          this {currency}{" "}
                          wallet address (Network = BEP20) then
                          come back and click on "I HAVE PAID".
                        </label>
                        <input
                        className="form-control col-12 mb-4"
                        name="address"
                        disabled
                        value={BNB_ADDRESS}						
                        />
                        </>
                        :
                        null
                    }
                    </>
                    <>
                      {currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE ?
                                  <>
                                    <label className="mb-2" >
                          Send ${amount}{" "}
                          worth of {currency} to
                          this {currency}{" "}
                          wallet address (Network = BEP20) then
                          come back and click on "I HAVE PAID".
                        </label>
                        
                        <input
                        className="form-control col-12 mb-4"
                        name="address"
                        disabled
                        value={ETH_ADDRESS}						
                        />
                        </>
                        :
                        null
                    }
                    </>
                </>
                </div>
                ) : null}

                      {/* <DropIn
                        options={{
                          authorization: data.clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => (data.instance = instance)}
                      /> */}
                      {proceedToPayment ? (
                          <>
                          <br/>
                          <input
                          className="form-control col-12 mb-4"
                          name="address"
                          placeholder="Provide your transaction hash..."
                          value={transactionHash}
                          onChange={(e) => setTransactionHash(e.target.value)}
                          />
                          <br/>
                          <button
                            type="submit"
                            onClick={invest}
                            className="hd-btn btn-block "
                          >
                            <b>I have Paid</b>
                            </button>
                            <br/>
                            <h6 className="text-right"
                              style={{textDecoration: "underline", cursor: "pointer"}}
                            onClick={handleProceedToPayment}
                            >
                              <b>Back</b>
                            </h6>
                            <br/>
                        <h6 className="text-warning">
                        ⚠️ Make payment before clicking on "I Have Paid" to
                          avoid failed or cancelled transaction.
                        </h6>
                        </>
                      ) : (
                        <div className="mt-5">
                          <button
                          type="submit"
                          onClick={handleProceedToPayment}
                          className="btn btn-success btn-block ">
                          <b>Proceed To Payment</b>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {/* {amount < investmentpackage.minimum_amount ? null : (
                
              )} */}
            </>
          ))}
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment of ${amount} was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h4 className="text-danger">Processing...</h4>;

  return (
    <div>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
