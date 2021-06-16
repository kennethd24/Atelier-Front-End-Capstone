import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Characteristics = (props) => {
  const { characteristic, objValue } = props;
  const now = (objValue[characteristic].value / 5) * 100;
  return (
    <div className="characteristic-entry">
      <div className="characteristic-left">
        {characteristic}
      </div>
      <div className="characteristic-right">
        {' '}
        <ProgressBar variant="success" now={now} />
      </div>
    </div>
  );
};
export default Characteristics;
