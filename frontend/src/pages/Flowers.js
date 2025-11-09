import React from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import './Flowers.css';

import banner from '../assets/flowers/main.jpg'
import fi1 from '../assets/flowers/single.jpeg'
import fi2 from '../assets/flowers/small.jpg'
import fi3 from '../assets/flowers/vase.jpg'
import fi4 from '../assets/flowers/bag.jpg'

const FlowerItems = [
  { name: "Single Flower Bouquet", price: "$3", desc: "Sometimes, less is more, and a single flower bouquet captures that perfectly. Elegant, timeless, and full of meaning, a single bloom speaks volumes", img: fi1 },
  { name: "Small Bouquet", price: "$7", desc: "Our small bouquet features a delightful mix of fresh, handpicked blooms, carefully arranged to showcase their natural beauty. Perfectly sized and elegantly designed, it adds a touch of color and warmth to any space. Pick your own or choose from our already designed ones.", img: fi2 },
  { name: "Paper Vase Bouquet", price: '$10', desc: "Our Paper Vase Bouquet combines artistry and sustainability, featuring a carefully arranged selection of fresh blooms wrapped in an aesthetic paper vase design. It’s a stylish and eco-friendly choice, perfect for adding a charming touch to any space.", img: fi3},
  { name: "Bag of Flowers", price: "$12", desc: "Our Bag of Flowers offers a charming and unique presentation, featuring a carefully arranged selection of fresh blooms elegantly nestled in a stylish carry bag. It’s a perfect blend of convenience and beauty, ready to brighten any occasion.", img: fi4}
];

function Flowers() {
  return (
    <>
      <div className="flowers-header">
        <img src= {banner} alt="flower Banner" />
        <div className='text-content'>
          <h1>Our Flower Selection</h1>
          <p>At aromatique, we believe flowers aren’t just gifts — they’re emotions brought to life. Whether it’s celebrating love and life, expressing gratitude, brightening someone’s day, or your own, our handpicked, fresh blooms are arranged with care and creativity to make every moment special.

From single flower bouquets to custom floral arrangements, we cater to your everyday moments that deserve a touch of beauty.</p>
        </div>
        
      </div>
      <div className="flowers-grid">
        {FlowerItems.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Flowers;
