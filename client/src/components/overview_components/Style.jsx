import React from 'react';

const Style = (props) => {
  const { style, currentStyle, setCurrentStyle } = props;

  const checkmark = <i className="fas fa-check" />;

  const changeStyle = () => {
    if (style.style_id !== currentStyle.style_id) {
      setCurrentStyle(style);
    }
  };

  return (
    // <div className="style-card" onClick={changeStyle}>
    <button type="button" className="style-card" onClick={changeStyle}>
      <img className="style-thumbnail" src={style.photos[0].thumbnail_url} alt={style.name} />
      {style.style_id === currentStyle.style_id && checkmark}
    </button>
    // </div>
  );
};

export default Style;
