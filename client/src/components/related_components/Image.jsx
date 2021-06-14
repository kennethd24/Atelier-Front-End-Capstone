import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const { photos } = props;

  const [imgUrl, setImgUrl] = useState('no-photo.png');

  useEffect(() => {
    if (photos && (photos.length > 0)) {
      if (photos[0].thumbnail_url) {
        setImgUrl(photos[0].thumbnail_url);
      }
    }
  }, [photos]);

  return (
    <div className="product-photo-wrapper">
      <img className="product-photo" src={imgUrl} alt="product" />
    </div>
  );
};

export default Image;
