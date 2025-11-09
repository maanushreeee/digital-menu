import React from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import './Gifting.css';

const giftItems = [
  { name: "Croissant", price: "$2", desc: "Buttery and flaky", img: "/assets/croissant.jpg" },
  { name: "Baguette", price: "$3", desc: "Classic French bread", img: "/assets/baguette.jpg" },
];

function Gift() {
  return (
    <>
      <div className="gift-header">
        <img src="/assets/gift-banner.jpg" alt="gift Banner" />
        <h1>Our gift Selection</h1>
        <p>Freshly baked every day.</p>
      </div>
      <div className="gift-grid">
        {giftItems.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Gift;
