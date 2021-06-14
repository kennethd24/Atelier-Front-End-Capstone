import React, { useState } from 'react';
import YourOutfitEntry from './YourOutfitEntry';

const YourOutfitComp = (props) => {
  const {
    selectedItem,
    selectedRating,
    selectedDefault,
  } = props;

  const [yourOutfit, setYourOutfit] = useState([]);
  const [outfitIds, setOutfitIds] = useState([]);

  const handleAdd = () => {
    if (!outfitIds.includes(selectedItem.id)) {
      setOutfitIds([...outfitIds, selectedItem.id]);
      selectedItem.rating = selectedRating;
      selectedItem.photos = selectedDefault.photos;
      selectedItem.styleName = selectedDefault.name;
      selectedItem.salePrice = selectedDefault.sale_price;
      selectedItem.origPrice = selectedDefault.original_price;
      setYourOutfit([...yourOutfit, selectedItem]);
    }
  };

  const handleRemove = (id) => {
    if (outfitIds.length === 1) {
      setOutfitIds([]);
      setYourOutfit([]);
    } else {
      setOutfitIds(outfitIds.filter((outfitId) => outfitId !== id));
      setYourOutfit(yourOutfit.filter((outfitItem) => outfitItem.id !== id));
    }
  };

  return (
    <div className="your-outfit-carousel">
      <button type="button" onClick={handleAdd} className="your-outfit-add">Add Selected Item to Your Outfit</button>
      {yourOutfit.map((item) => (
        <YourOutfitEntry
          item={item}
          handleRemove={handleRemove}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default YourOutfitComp;
