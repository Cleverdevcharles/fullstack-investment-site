import React from 'react'

function Subscribe() {
    return (
      <div className="subscribe-area bg-color">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="subscribe-inner">
                <div className="subdcribe-content">
                  <div className="section-headline text-center">
                    <h2>Subscribe</h2>
                    <p>
                      We focused majorly on growing your financial assets with
                      unbeatable rates as return on investment (ROI).
                    </p>
                  </div>
                  <div className="subs-form">
                    <form
                      id="contactForm"
                      method="POST"
                      action="contact.php"
                      className="contact-form"
                    >
                      <input
                        type="email"
                        className="email form-control"
                        id="email"
                        placeholder="Email"
                        required
                        data-error="Please enter your email"
                      />
                      <button type="submit" id="submit" className="add-btn">
                        Subscribe
                      </button>
                    </form>
                  </div>
                  <div className="brand-content">
                    <div className="brand-carousel owl-carousel">
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/1.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/2.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/3.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/4.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/5.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/6.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/7.png" alt="" />
                        </a>
                      </div>
                      <div className="single-brand-item">
                        <a>
                          <img src="img/brand/8.png" alt="" />
                        </a>
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
}

export default Subscribe
