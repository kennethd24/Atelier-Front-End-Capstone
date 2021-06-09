import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsComp from './related_components/RelatedItems';
import YourOutfitComp from './related_components/YourOutfit';

const RelatedItems = (props) => {
  const { currentItem, rating } = props;

  return (
    <div id="related-outfit-wrapper">
      <div id="relateditems"><RelatedItemsComp currentItem={currentItem} selectedRating={rating} /></div>
      <div id="youroutfit"><YourOutfitComp /></div>
    </div>
  );
};

export default RelatedItems;
