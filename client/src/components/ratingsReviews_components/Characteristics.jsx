import React from 'react';

const Characteristics = (props) => {
  console.log(props.characteristic);
  return (
    <div>
      {props.characteristic}
      {' '}
      <span>~~Add bar lines here~~</span>
    </div>
  )
}
export default Characteristics;