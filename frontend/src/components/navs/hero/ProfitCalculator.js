import React, { useEffect, useState } from "react";
import { getInvestmentPackages } from "../../../functions/investmentpackage";

function ProfitCalculator() {
  const [data, setData] = useState({
    categories: [],
    category: "",
  });
  const [values, setValues] = useState({
    invest_amount: "",
    profit: "",
  });
  const { invest_amount, profit } = values;
  const { categories, category } = data;
  const handleChange = (name) => (e) => {
    setValues({ values, [name]: e.target.value });
  }
  const loadInvestmentPackages = () => {
    getInvestmentPackages().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadInvestmentPackages();
  }, []);

  const solveProfit = () => {
    return categories.map((investmentpackage, ip) => (
      <option value={investmentpackage.percentage_interest} key={ip}>
        {investmentpackage.name}
      </option>
    ));
  }
  return (
    <div className="profit-calculater-area bg-color-2 fix area-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="section-headline text-center">
              <h2>Profit Calculater</h2>
              <p>
                We focused majorly on growing your financial assets with
                unbeatable rates as return on investment (ROI).
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="about-profit-inner">
              <div className="about-calculater">
                <h3>About profit calculater</h3>
                <p>
                  The phrasal sequence of the Lorem Ipsum text is now so
                  widespread and commonplace that many DTP programmes can
                  generate dummy. The phrasal sequence of the Lorem Ipsum text
                  is now so widespread and commonplace that many DTP programmes
                  can generate dummy
                </p>
                <p>
                  The phrasal sequence of the Lorem Ipsum text is now so
                  widespread and commonplace that many DTP programmes can
                  generate dummy. The phrasal sequence of the Lorem Ipsum text
                  is now so widespread and commonplace that many DTP programmes
                  can generate dummy
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="profit-calculater-inner">
              <form className="profit-calculator">
                <div className="row">
                  <div className="col-lg-6 mb-30">
                    <label>Choose Plan</label>
                    <select className="calculater-select-bg">
                      <option selected>Choose Plan</option>
                      {categories.map((investmentpackage, ip) => (
                        <option
                          value={investmentpackage.percentage_interest}
                          key={ip}
                        >
                          {investmentpackage.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-30">
                    <label>Invest Amount</label>
                    <input
                      type="number"
                      name="invest_amount"
                      id="invest_amount"
                      placeholder="0.00"
                      onChange={handleChange("invest_amount")}
                      value={invest_amount}
                      className="form-control base--bg"
                    />
                  </div>
                  <div className="col-lg-12">
                    <label>Profit Amount</label>
                    <input
                      type="text"
                      name="profit_amount"
                      id="profit_amount"
                      placeholder="0.00"
                      onChange={handleChange("profit")}
                      value={categories.map(
                        (investmentpackage, ip) =>
                         Math.round((invest_amount * investmentpackage.percentage_interest)/100)
                      )}
                      className="form-control base--bg"
                      disabled=""
                    />
                  </div>
                  <div>
                    <button className="form-control" onClick={solveProfit}>
                      Calulate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitCalculator;
