import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import ProductCard from './ProductCard';

const YourOutfitComp = (props) => {
  const { currentItem } = props;
  const [yourOutfit, setYourOutfit] = useState([]);
  const [outfitIds, setOutfitIds] = useState([]);

  const handleAdd = () => {
    if (!outfitIds.includes(currentItem.id)) {
      setOutfitIds([...outfitIds, currentItem.id]);
      setYourOutfit([...yourOutfit, currentItem]);
    }
  };

  return (
    <div className="your-outfit-carousel">
      <button type="button" onClick={handleAdd}>Add Selected Item to Your Outfit</button>
      {yourOutfit.map((item) => (
        <ProductCard relatedItem={item} key={item.id} />
      ))}
    </div>
  );
};

export default YourOutfitComp;
