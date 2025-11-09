import React from "react";
import Footer from "../components/Footer";
import GridItem from "../components/GridItem";
import "./Gifting.css";

const giftItems = [
  {
    name: "Croissant",
    price: "$2",
    desc: "Buttery and flaky",
    img: "/assets/croissant.jpg",
  },
  {
    name: "Baguette",
    price: "$3",
    desc: "Classic French bread",
    img: "/assets/baguette.jpg",
  },
];

function Gift() {
  return (
    <>
      <section className="gift-header">
        <img
          src="/assets/gift-banner.jpg"
          alt="Gift Banner"
          className="gift-banner"
        />
        <div className="gift-header-text">
          <h1>Our Gift Selection</h1>
          <p>Freshly baked every day.</p>
        </div>
      </section>

      <section className="gift-grid">
        {giftItems.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </section>

      <Footer />
    </>
  );
}

export default Gift;
