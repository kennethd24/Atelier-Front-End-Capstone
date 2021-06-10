import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from './DropdownItem';

const QuantityDropdown = (props) => {
  const {
    currentStyle,
    size,
    quantity,
    setQuantity,
  } = props;

  const [limitedQuantity, setLimitedQuantity] = useState(null);

  useEffect(() => {
    if (size) {
      findQuantity();
      setQuantity(1);
    } else {
      // when currentStyle changes, size gets set to null in SizeDropdown.jsx
      // when size is null, we want quantity to be null too
      setQuantity(null);
      setLimitedQuantity(null);
    }
  }, [size]);

  const findQuantity = () => {
    const skusArr = Object.values(currentStyle.skus);
    let count = 0;

    skusArr.forEach((skuObj) => {
      if (skuObj.size === size) {
        count += skuObj.quantity;
      }
    });

    if (count > 15) {
      setLimitedQuantity(15);
    } else {
      setLimitedQuantity(count);
    }
  };

  const onSelect = (eventKey, e) => {
    e.preventDefault();
    if (quantity !== eventKey) {
      setQuantity(eventKey);
    }
  };

  let dropdown;

  if (limitedQuantity) {
    dropdown = (
      <DropdownButton id="quantity-dropdown" title={quantity} variant="outline-dark" onSelect={onSelect}>
        {
          [...Array(limitedQuantity)]
            .map(
              (el, index) => <DropdownItem option={index + 1} selected={quantity} key={index} />,
            )
        }
      </DropdownButton>
    );
  } else {
    dropdown = (
      <DropdownButton id="quantity-dropdown" title="-" variant="outline-dark" disabled />
    );
  }

  return (
    dropdown
  );
};

export default QuantityDropdown;
