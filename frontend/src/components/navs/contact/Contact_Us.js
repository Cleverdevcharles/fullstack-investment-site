import emailjs from "emailjs-com";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../../functions/auth";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Subscribe from "../hero/Subscribe";

function Contact_Us() {
  const { user } = isAuthenticated();
  const [send, setSend] = useState("Send");

  const sendMail = (e) => {
    e.preventDefault();
    setSend("Sending...");
    emailjs
      .sendForm(
        "service_0yvl6fp",
        "template_afap4sd",
        e.target,
        "user_QSECIzz7Vkicmi1fzqCFr"
      )
      .then((res) => {
        console.log(res);
        toast.success(
          "Message sent....we will get back to you as soon as possible."
        );
        setTimeout(() => {
          setSend("Send");
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Message Failed. Please try again.");
        setTimeout(() => {
          setSend("Send");
          window.location.reload();
        }, 1000);
      });
  };
  return (
    <>
      <Header />
      <main>
        <div class="page-area bread-pd">
          <div class="breadcumb-overlay"></div>
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="breadcrumb-title text-center">
                  <h2>Contact us</h2>
                  <div class="bread-come">
                    <nav aria-label="breadcrumb ">
                      <ol class="breadcrumb purple lighten-4 justify-content-center">
                        <li class="breadcrumb-items">
                          <a class="black-text" href="#">
                            Home
                          </a>
                          <i class="ti-angle-right" aria-hidden="true"></i>
                        </li>
                        <li class="breadcrumb-items">
                          <a class="black-text" href="#">
                            Contact us
                          </a>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-page bg-color area-padding">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6">
                <div class="contact-left">
                  <div class="contact-image">
                    <img src="img/about/ab.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6">
                <div class="contact-form">
                  <form
                    id="contactForm"
                    onSubmit={sendMail}
                    class="contact-form"
                  >
                    <div class="row">
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="form-control text-white"
                          placeholder="Name"
                          required
                          data-error="Please enter your name"
                        />
                        <div class="help-block with-errors"></div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="email"
                          class="email form-control text-white"
                          id="email"
                          name="user_email"
                          placeholder="Email"
                          required
                          data-error="Please enter your email"
                        />
                        <div class="help-block with-errors"></div>
                      </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="text"
                          id="msg_subject"
                          class="form-control text-white"
                          placeholder="Subject"
                          required
                          data-error="Please enter your message subject"
                        />
                        <div class="help-block with-errors"></div>
                      </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <textarea
                          id="message"
                          rows="7"
                          name="message"
                          placeholder="Massage"
                          class="form-control text-white"
                          required
                          data-error="Write your message"
                        ></textarea>
                        <div class="help-block with-errors"></div>
                      </div>
                      <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button
                          type="submit"
                          id="submit"
                          value={send}
                          class="contact-btn"
                        >
                          Submit
                        </button>
                        <div id="msgSubmit" class="h3 text-center hidden"></div>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}

export default Contact_Us;
