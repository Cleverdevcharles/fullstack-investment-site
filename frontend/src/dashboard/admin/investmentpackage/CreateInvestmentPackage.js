import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../../functions/auth";
import { createInvestmentPackage } from "../../../functions/investmentpackage";
import Header from "../../../components/navs/header/Header";
import Footer from "../nav/Footer";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";
import InvestmentPackageForm from "./InvestmentPackageForm";

const CreateInvestmentPackage = () => {
  const [name, setName] = useState();
  const [minimum_amount, setMinimumAmount] = useState();
  const [maximum_amount, setMaximumAmount] = useState();
  const [percentage_interest, setPercentageInterest] = useState();
  const [duration, setDuration] = useState();
  const [loading, setLoading] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Investment package  name is required.");
      }, 1000);
      return;
    }
    if (name.length > 32) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Investment package name is long, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (name.length <= 2) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Investment package  name is short, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (!duration) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Duration is required. ");
      }, 1000);
      return;
    }
    if (!minimum_amount) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Minimum investment amount  is required. ");
      }, 1000);
      return;
    }
    if (minimum_amount <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Minimum investment amount can not be equal to or less than 0."
        );
      }, 1000);
      return;
    }
    if (!maximum_amount) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Maximum investment amount  is required. ");
      }, 1000);
      return;
    }
    if (maximum_amount <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Maximum investment amount can not be equal to or less than 0."
        );
      }, 1000);
      return;
    }
    if (!percentage_interest) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Percentage interest  is required. ");
      }, 1000);
      return;
    }
    if (percentage_interest <= 0) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Percentage interest can not be equal to or less than 0. ");
      }, 1000);
      return;
    }

    // make request to api to create category
    createInvestmentPackage(user._id, token, {
      name,
      minimum_amount,
      maximum_amount,
      duration,
      percentage_interest,
    }).then((data) => {
      if (data.error) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.error(
            `Investment Package should be unique. ${name} already exist.`
          );
        }, 1000);
        console.log(data);
      } else {
        setLoading(true);
        setLoading(false);
        toast.success(`Investment Package "${name}" created successfully.`);
        setName("");
        setMinimumAmount("");
        setMaximumAmount("");
        setDuration("");
        setPercentageInterest("");
      }
    });
  };

  return (
    <>
      <Header />
      <main>
        <PageArea />
        <div className="notify-overlay"></div>
        <div className="notify-overlay"></div>
        <div className="dsahboard-area bg-color area-padding">
          <div className="container">
            <div className="row">
              <SideBar />
              <InvestmentPackageForm
                handleSubmit={handleSubmit}
                name={name}
                minimum_amount={minimum_amount}
                maximum_amount={maximum_amount}
                duration={duration}
                percentage_interest={percentage_interest}
                setName={setName}
                setMinimumAmount={setMinimumAmount}
                setMaximumAmount={setMaximumAmount}
                setDuration={setDuration}
                setPercentageInterest={setPercentageInterest}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateInvestmentPackage;
