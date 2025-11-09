import React from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import './Combos.css';

import ci1 from '../assets/combos/fc.jpg'
import ci2 from '../assets/combos/fcd.jpeg'
import ci3 from '../assets/combos/fd.jpeg'
import main from '../assets/combos/combos.jpg'

const comboItems = [
  { name: "Flowers and Coffee Combo", price: "$8", desc: "Buttery and flaky", img: ci1 },
  { name: "Flowers, Coffee and Dessert Combo", price: "$12", desc: "Classic French bread", img: ci2 },
  { name: "Flowers and Dessert Combo", price: "$10", desc: "", img: ci3}
];

function Combo() {
  return (
    <>
      <div className="combo-header">
        <img src= {main} alt="combo Banner" />
        <div>
          <h1>Our Combos</h1>
          <p>Freshly baked every day.</p>
        </div>
      </div>
      <div className="combo-grid">
        {comboItems.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Combo;
