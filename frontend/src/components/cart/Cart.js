import React, { useEffect, useState } from "react";
import InvestmentCard from "../card/InvestmentCard";
import { emptyCart, getCart } from "./cartHelpers";
import Header from "../navs/header/Header";
import Footer from "../navs/footer/Footer";
import Checkout from "../checkout/Checkout";

const Cart = ({ history }) => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const cancel = () => {
    emptyCart(() => {
      setRun(!run); // run useEffect in parent Cart
      history.push("/investment");
    });
  };

  const showItems = (items) => {
    return (
      <>
        {items.map((investmentpackage, ip) => (
          <InvestmentCard
            key={ip}
            investmentpackage={investmentpackage}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveInvestmentPackageButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <Header />
      <main>
        <div className="page-area bread-pd">
          <div className="breadcumb-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-title text-center">
                  <h2>Invest Now</h2>
                  <div className="bread-come">
                    <nav aria-label="breadcrumb ">
                      <ol className="breadcrumb purple lighten-4 justify-content-center">
                        <li className="breadcrumb-items">
                          <a className="black-text" href="#">
                            Home
                          </a>
                          <i className="ti-angle-right" aria-hidden="true"></i>
                        </li>
                        <li className="breadcrumb-items">
                          <a className="black-text" href="#">
                            Invest Now
                          </a>
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <hr />
                  <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                      {items.length > 0 ? showItems(items) : null}
                      {/* <button
                        type="submit"
                        onClick={cancel}
                        className="slide-btn login-btn"
                      >
                        <b>Cancel</b>
                      </button> */}
                    </div>
                    <div className="col-xl-6 col-lg-4 col-md-6">
                      <Checkout
                        investmentpackages={items}
                        setRun={setRun}
                        run={run}
                      />
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

export default Cart;
