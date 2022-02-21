import React from "react";
import InvestmentCard from "./InvestmentCard";

// this is childrend component of Product page
const SinglePlan = ({ investmentpackage }) => {

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6">
          {investmentpackage && investmentpackage.percentage_interest && (
            <InvestmentCard
              investmentpackage={investmentpackage}
              showViewInvestmentPackageButton={showViewInvestmentPackageButton}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePlan;
