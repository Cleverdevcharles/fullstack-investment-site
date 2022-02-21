import React from "react";
import Header from "../../navs/header/Header";
import Footer from "../../navs/footer/Footer";
import Checkout from "../../Checkout";
import Subscribe from "../hero/Subscribe";
import Plan from "../hero/Plan";

const Payment = ({ investmentpackage }) => {
  const {
    name,
    minimum_amount,
    _id,
    maximum_amount,
    price,
    percentage_interest,
  } = investmentpackage;

  return (
    <>
      <Header />
      <main>
        <div className="jumbotron hero">
          <div className="banner">
            <h1 className="banner-title mt-4">Payment</h1>
          </div>
        </div>
        {name}
        <div className="row container-fluid">
          <div className="col-md-4">
            {/* <Checkout products={items} setRun={setRun} run={run} /> */}
          </div>
        </div>
        <Subscribe />
      </main>
      <Footer />
    </>
  );
};

export default Payment;
