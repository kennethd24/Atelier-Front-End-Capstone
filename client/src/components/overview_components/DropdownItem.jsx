import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownItem = (props) => {
  const { option, selected } = props;

  return (
    <Dropdown.Item
      eventKey={option}
      active={option === selected}
    >
      {option}
    </Dropdown.Item>
  );
};

export default DropdownItem;
