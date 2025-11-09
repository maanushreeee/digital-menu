import React, { useState } from 'react';
import './GridItem.css';

function GridItem({ name, price, desc, img }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="grid-item">
      <img src={img} alt={name} onClick={handleClick} className="grid-item-image" />
      <h3 className="grid-item-name">{name}</h3>
      
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>✖</button>
            <h3>{name}</h3>
            <h5>{price}</h5>
            <p>{desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GridItem;
