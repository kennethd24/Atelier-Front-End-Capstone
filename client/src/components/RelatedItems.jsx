import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsComp from './related_components/RelatedItems';
import YourOutfitComp from './related_components/YourOutfit';

const RelatedItems = (props) => {
  const { currentItem, rating, handleClick } = props;

  return (
    <div className="related-outfit-wrapper">
      <div className="related-items-wrapper">
        <h3 className="related-items-title">Related Products</h3>
        <div className="related-items-carousel-wrapper">
          <RelatedItemsComp
            currentItem={currentItem}
            selectedRating={rating}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className="your-outfit-wrapper">
        <h3 className="your-outfit-title">Your Outfit</h3>
        <div className="your-outfit-carousel-wrapper"><YourOutfitComp currentItem={currentItem} /></div>
      </div>
    </div>
  );
};

export default RelatedItems;
