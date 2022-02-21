import React, { useEffect, useState } from "react";
import { getInvestmentPackages } from "../../../functions/investmentpackage";
import { Link } from "react-router-dom";
import InvestmentCard from "../../card/InvestmentCard";

const Plan = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
  });

  const { categories, category } = data;

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
  return (
    <div className="invest-area bg-color-2 area-padding-2">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="section-headline text-center">
              <h2>Investment plan</h2>
              <p>
                We focused majorly on growing your financial assets with
                unbeatable rates as return on investment (ROI).
              </p>
            </div>
          </div>
        </div>

        <div>
          <ul className="row">
            {categories.map((investmentpackage, ip) => (
              <li className="col-xl-4 col-lg-4 col-md-6" key={ip}>
                <InvestmentCard investmentpackage={investmentpackage} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plan;
