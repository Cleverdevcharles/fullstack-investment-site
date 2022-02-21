import React from "react";

const Faq = () => {
  return (
    <div>
      <div className="faq-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="section-headline text-center">
                <h2>Important Faq</h2>
                <p>
                  We focused majorly on growing your financial assets with
                  unbeatable rates as return on investment (ROI).
                </p>
              </div>
            </div>
          </div>
          <div className="row p-5">
            <div className="col-xl-12 col-lg-12 col-md-12 ">
              <div className="company-faq-left">
                <div className="faq_inner">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingOne">
                        <h4 className="faq-top-text">
                          <button
                            className="faq-accordion-btn"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            1. We are the best invest platform in the world?
                          </button>
                        </h4>
                      </div>

                      <div
                        id="collapseOne"
                        className="collapse show "
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      ></div>
                    </div>
                    <div className="card">
                      <div className="card-header white-bg" id="headingTwo">
                        <h4 className="faq-top-text">
                          <button
                            className="faq-accordion-btn collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            2. World class creative experts team member?
                          </button>
                        </h4>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      ></div>
                    </div>
                    <div className="card">
                      <div className="card-header white-bg" id="headingThree">
                        <h4 className="faq-top-text">
                          <button
                            className="faq-accordion-btn collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            3. Clients satisfaction make company value?
                          </button>
                        </h4>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
