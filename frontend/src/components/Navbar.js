import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 90) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${visible ? 'navbar--visible' : 'navbar--hidden'}`}>
      <h1>aromatique</h1>
      <div>
        <Link to="/coffee">Coffee</Link>
        <Link to="/bakery">Bakery</Link>
        <Link to="/flowers">Flowers</Link>
        <Link to="/combos">Combos</Link>
        <Link to="/gifting">Gifting</Link>
      </div>
    </nav>
  );
}

export default Navbar;
