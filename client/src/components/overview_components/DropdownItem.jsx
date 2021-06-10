import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownItem = (props) => {
  const { availableSize, size } = props;

  return (
    <Dropdown.Item
      eventKey={availableSize}
      active={availableSize === size}
    >
      {availableSize}
    </Dropdown.Item>
  );
};

export default DropdownItem;
