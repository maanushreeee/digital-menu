import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

import shopBanner from '../assets/main.jpg'
import coffeeHome from '../assets/pexels-elkady-8228302.jpg'
import bakeryHome from '../assets/pexels-dima-valkov-1186343-3740245.jpg'
import flowersHome from '../assets/flowers.jpg'
import combosHome from  '../assets/WhatsApp Image 2024-12-07 at 18.26.51_798bb64e.jpg'
import giftHome from '../assets/download.jpg'

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <header className="home-header">
          <img src={shopBanner} alt="Shop Banner" />
          <div className="shop-info">
            <h1>Welcome to Our Shop</h1>
            <p>Enjoy the best coffee, bakery delights, and flowers.</p>
          </div>
        </header>
        <div className='text'>
          <h1>Explore Our Range</h1>
        </div>
        <section className="categories">
          <Link to="/coffee">
            <img src={coffeeHome} alt="Coffee" />
            <p>Coffee</p>
          </Link>
          <Link to="/bakery">
            <img src= {bakeryHome} alt="Bakery" />
            <p>Bakery</p>
          </Link>
          <Link to="/flowers">
            <img src= {flowersHome} alt="Flowers" />
            <p>Flowers</p>
          </Link>
          <Link to="/combos">
            <img src= {combosHome} alt="Combos" />
            <p>Combos</p>
          </Link>
          <Link to="/gifting">
            <img src={giftHome} alt="Gifting" />
            <p>Gifting</p>
          </Link>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
