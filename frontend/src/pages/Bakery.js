import React from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import './Bakery.css';

import bakeryHome from '../assets/bakery/main.jpg'
import bi1 from '../assets/bakery/floral.jpeg'
import bi2 from '../assets/bakery/shortcake.jpg'
import bi3 from '../assets/bakery/lemontart.jpg'
import bi4 from '../assets/bakery/applepie.jpg'
import bi5 from '../assets/bakery/blueberrycheesecake.jpg'
import bi6 from '../assets/bakery/redvelvet.jpg'
import bi7 from '../assets/bakery/ctart.jpg'
import bi9 from '../assets/bakery/cookies.jpg'
import bi10 from '../assets/bakery/Chocolate Fudge Cupcakes.jpg'

const bakeryItems = [
  {name: 'Floral Cupcakes', price: '$3.50', desc: 'These delightful treats are a unique blend of classic baking and artistic flair. We start with a moist and tender vanilla cake, then top it with a swirl of rich buttercream frosting. The finishing touch? A delicate arrangement of fresh, seasonal flowers, adding a touch of elegance and whimsy to each cupcake.', img: bi1},
  {name: 'Chocolate Strawberry Shortcake', price: '$4.50', desc: 'Indulge in our decadent Chocolate Strawberry Shortcake. Rich chocolate cake is layered with creamy whipped cream and topped with fresh, juicy strawberries. A perfect dessert for any occasion.', img: bi2},
  {name: 'Lemon Tart', price: '$4.00', desc: 'A buttery, golden crust filled with a smooth, tangy lemon curd. Each bite offers a perfect balance of sweetness and citrusy zest, making it a refreshing treat to enjoy with your favorite coffee.', img: bi3},
  {name: 'Apple Pie', price: '$5.00', desc: 'A flaky, golden crust filled with tender, spiced apple slices, delivering a warm and comforting flavor in every bite.', img: bi4},
  {name: 'Blueberry Cheesecake', price: '$5.00', desc: 'A creamy, rich cheesecake layer on a buttery biscuit base, topped with a sweet and tangy blueberry compote for a burst of flavor in every bite.', img: bi5},
  {name: 'Red Velvet Cupackes', price: '$3.00', desc: 'Soft and moist, with a rich cocoa flavor and a hint of vanilla, topped with a smooth cream cheese frosting for the perfect sweet indulgence.', img: bi6},
  {name: 'Chocolate Tart', price: '$4.50', desc: 'A buttery, crisp crust filled with a smooth, rich chocolate ganache, delivering a decadent and indulgent experience in every bite.', img: bi7},
  {name: 'Cookies', price: '$3.00', desc: 'We offer three cookie options: Chocolate Chip with classic, gooey chocolate chunks, Double Chocolate Chip for an extra chocolatey indulgence, and Red Velvet, with its soft, rich dough and a hint of cream cheese flavor.', img: bi9},
  {name: 'Chocolate Cupcakes', price: '$3.00', desc: 'Rich, moist, and packed with decadent cocoa flavor, topped with a smooth chocolate frosting for an irresistible treat in every bite.', img: bi10}
];

function bakery() {
  return (
    <>
      <div className="bakery-header">
        <img src= {bakeryHome} alt="bakery Banner" />
        <div className='text-content'>
          <h1>Our Baked Goods Selection</h1>
          <p> 
            At our shop, we take great pride in our bakery offerings, 
            made with the finest ingredients and baked fresh daily. 
            Each item is crafted with care to deliver a perfect balance of flavors and textures, 
            ensuring that every bite is a delightful experience. Our sweet treats are designed to complement the rich, 
            bold flavors of our coffee, creating a harmonious pairing for any time of day. 
            From delicate pastries to indulgent cakes, every item is made with passion and attention to detail. 
            Whether you're here for a morning pick-me-up or an afternoon treat, our bakery items offer a little moment of sweetness 
            and comfort to brighten your day.
          </p>
        </div>
      </div>
      <div className="bakery-grid">
        {bakeryItems.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default bakery;
