import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import YourOutfitEntry from './YourOutfitEntry';

SwiperCore.use([Navigation, Pagination]);

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
      <Swiper
        slidesPerView={3.5}
        spaceBetween={25}
        pagination={{ clickable: true }}
        navigation
      >
        {yourOutfit.map((item) => (
          <SwiperSlide>
            <YourOutfitEntry
              item={item}
              handleRemove={handleRemove}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YourOutfitComp;
