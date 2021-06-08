import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsComp from './related_components/RelatedItems';
import YourOutfitComp from './related_components/YourOutfit';

const RelatedItems = (props) => {
  const { currentItem } = props;

  return (
    <div id="related-outfit-wrapper">
      <div id="relateditems"><RelatedItemsComp currentItem={currentItem} /></div>
      <div id="youroutfit"><YourOutfitComp /></div>
    </div>
  );
};

export default RelatedItems;
