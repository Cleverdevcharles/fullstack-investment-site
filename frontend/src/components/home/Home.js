import React, { useEffect, useState } from "react";
import AboutCustom from "../navs/hero/AboutCustom";
import Counter from "../navs/hero/Counter";
// import { getProducts } from "../apiCore";
// import ProductCard from "../card/ProductCard";
import Footer from "../navs/footer/Footer";
import Header from "../navs/header/Header";
import Hero from "../navs/hero/Hero";
import WhyChooseUs from "../navs/hero/WhyChooseUs";
import HowToStart from "../navs/hero/HowToStart";
import ProfitCalculator from "../navs/hero/ProfitCalculator";
import Subscribe from "../navs/hero/Subscribe";
import Plan from "../navs/hero/Plan";
// import "./Home.css";

function Home() {
  // const [productsBySell, setProductsBySell] = useState([]);
  // const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  // const loadProductsBySell = () => {
  //   getProducts("sold").then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setProductsBySell(data);
  //     }
  //   });
  // };

  // const loadProductsByArrival = () => {
  //   getProducts("createdAt").then((data) => {
  //     console.log(data);
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setProductsByArrival(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadProductsByArrival();
  //   loadProductsBySell();
  // }, []);
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Counter />
        <AboutCustom />
        <Plan />
        <WhyChooseUs />
        <HowToStart />
        {/* <ProfitCalculator /> */}
        <Subscribe/>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
