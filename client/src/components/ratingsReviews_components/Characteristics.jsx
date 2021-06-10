import React from 'react';

const Characteristics = (props) => {
  console.log(props.characteristic);
  return (
    <div>
      {props.characteristic}
    </div>
  )
}
export default Characteristics;