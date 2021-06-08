import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsComp from './related_components/RelatedItems.jsx';
import YourOutfitComp from './related_components/YourOutfit.jsx';

const RelatedItems = (props) => {
  const { currentItem } = props;

  // const [relatedIds, setRelatedIds] = useState([]);
  // const [relatedItems, setRelatedItems] = useState([]);
  // const [yourOutfit, setYourOutfit] = useState([]);

  // const getRelatedItems = (arr) => {
  //   arr.forEach((itemId) => (
  //     axios.get(`/api/products/${itemId}`)
  //       .then((results) => {
  //         setRelatedItems(relatedItems.push(results.data));
  //       })
  //       .catch((err) => {
  //         console.log('error in getrelatedItems', err);
  //       })
  //   ));
  // };

  // const getRelatedIds = (id) => {
  //   axios.get(`/api/related/${id}`)
  //     .then((results) => {
  //       setRelatedIds(relatedIds.push(results.data));
  //       getRelatedItems(results.data);
  //     })
  //     .catch((err) => {
  //       console.log('error in getRelatedIds', err);
  //     });
  // };



  // useEffect(() => {
  //   getRelatedIds(currentItem.id);
  // }, [currentItem]);

  return (
    <div id="related-outfit-wrapper">
      <div id="relateditems"><RelatedItemsComp currentItem={currentItem} /></div>
      <div id="youroutfit"><YourOutfitComp /></div>
    </div>
  );
};

export default RelatedItems;
