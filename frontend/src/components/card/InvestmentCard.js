import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  addItem,
  emptyCart,
  removeItem,
  updateItem,
} from "../cart/cartHelpers";

const InvestmentCard = ({
  investmentpackage,
  showViewInvestmentPackageButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveInvestmentPackageButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(investmentpackage.count);
  const history = useHistory();

  const showViewButton = (showViewInvestmentPackageButton) => {
    return (
      showViewInvestmentPackageButton && (
        <Link
          to={`/investment-package-${investmentpackage._id}`}
          className="mr-2"
        >
          <button className="bag-btn view_prtd" data-id="1">
            <i className="fas fa-eye">Invest</i>
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    emptyCart(() => {
      setRun(!run);
    });

    addItem(investmentpackage, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return null;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <div className="price-btn">
          <Link
            className="blue"
            onClick={addToCart}
            to={`/investment-package-${investmentpackage._id}`}
          >
            Invest Now
          </Link>
        </div>
      )
    );
  };

  const handleChange = (investmentpackageId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(investmentpackageId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group ml-2 mb-3">
            <input
              type="number"
              value={count}
              className="adjust_btn p-2 pl-3"
              style={{
                border: "2px solid #f09d51",
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
              onChange={handleChange(investmentpackage._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveInvestmentPackageButton) => {
    return (
      showRemoveInvestmentPackageButton && (
        <div className="container">
          <button
            onClick={() => {
              removeItem(investmentpackage._id);
              setRun(!run); // run useEffect in parent Cart
            }}
            className="btn container btn-outline-danger mt-2 mb-2"
            style={{
              backgroundColor: "red",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Cancel Investment
          </button>
        </div>
      )
    );
  };
  return (
    <>
      {shouldRedirect(redirect)}
        <div className="pri_table_list text-center">
          <div className="top-price-inner">
            <h3>{investmentpackage.name}</h3>
            <div className="rates">
              <span className="prices">
                {investmentpackage.percentage_interest}%
              </span>
              {investmentpackage.duration == 7 ? (
                <span className="users">Weekly</span>
              ) : (
                <span className="users">Monthly</span>
              )}
            </div>
          </div>
          <ol className="pricing-text">
            <li className="check">
              Minimam Invest : ${investmentpackage.minimum_amount}
            </li>
            <li className="check">
              Maximam Invest : ${investmentpackage.maximum_amount}
            </li>
            {investmentpackage.duration == 7 ? (
              <li className="check">
                Total Monthly: {investmentpackage.percentage_interest * 4}%
              </li>
            ) : (
              <li className="check">
                Total Yearly: {investmentpackage.percentage_interest * 12}%
              </li>
            )}
            {showAddToCartBtn(showAddToCartButton)}
          </ol>
        </div>
    </>
  );
};

export default InvestmentCard;
