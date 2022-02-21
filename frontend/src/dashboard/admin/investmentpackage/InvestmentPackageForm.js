import React from "react";

const CategoryForm = ({
  handleSubmit,
  name,
  duration,
  minimum_amount,
  maximum_amount,
  percentage_interest,
  setName,
  setDuration,
  setMinimumAmount,
  setMaximumAmount,
  setPercentageInterest,
  loading,
}) => {
  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="login-area area-padding fix">
        <div className="login-overlay"></div>
        <div className="container">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-8 col-lg-10 col-md-10">
              <div className="login-form signup-form">
                <h4 className="login-title text-center">
                  Create New Investment Package
                </h4>
                <form
                  id="contactForm"
                  className="log-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="Package Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="Minimum Amount."
                        onChange={(e) => setMinimumAmount(e.target.value)}
                        value={minimum_amount}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="Minimun Amount"
                        onChange={(e) => setMaximumAmount(e.target.value)}
                        value={maximum_amount}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="Percentage Initerest"
                        onChange={(e) => setPercentageInterest(e.target.value)}
                        value={percentage_interest}
                      />
                    </div>
                    <select
                      className="col-md-6 form-control"
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option selected style={{ color: "gray" }}>
                        Select Duraction
                      </option>
                      <option value="7" style={{ color: "gray" }}>
                        Weekly
                      </option>
                      <option value="30" style={{ color: "gray" }}>
                        Monthly
                      </option>
                    </select>
                  </div>

                  <button type="submit" className="slide-btn login-btn">
                    {loading ? (
                      <div className="spinner" id="spinner">
                        Loading...
                      </div>
                    ) : (
                      <b>Create</b>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
