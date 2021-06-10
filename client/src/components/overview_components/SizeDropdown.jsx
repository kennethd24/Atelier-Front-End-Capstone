import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from './DropdownItem';

const SizeDropdown = (props) => {
  const { currentStyle, size, setSize } = props;

  useEffect(() => {
    if (currentStyle) {
      findSizes();
      setSize(null);
    }
  }, [currentStyle]);

  const [availableSizes, setAvailableSizes] = useState([]);

  const [active, setActive] = useState(null);

  const findSizes = () => {
    const skusArr = Object.values(currentStyle.skus);
    const sizeSet = new Set();
    let stockFound = false;

    skusArr.forEach((skuObj) => {
      if (skuObj.quantity > 0) {
        sizeSet.add(skuObj.size);
        stockFound = true;
      }
    });

    const sizeArr = Array.from(sizeSet);

    setAvailableSizes(sizeArr);
    setActive(stockFound);
  };

  const onSelect = (eventKey, e) => {
    e.preventDefault();
    if (size !== eventKey) {
      setSize(eventKey);
    }
  };

  let dropdown;

  if (active) {
    dropdown = (
      <DropdownButton id="dropdown-item-button" title={size || 'SELECT SIZE'} variant="outline-dark" onSelect={onSelect}>
        {
          availableSizes.map((availableSize, index) => (
            <DropdownItem
              option={availableSize}
              selected={size}
              key={index}
            />
          ))
        }
      </DropdownButton>
    );
  } else {
    dropdown = (
      <DropdownButton id="dropdown-item-button" title="OUT OF STOCK" variant="outline-dark" disabled />
    );
  }

  return (
    dropdown
  );
};

export default SizeDropdown;
