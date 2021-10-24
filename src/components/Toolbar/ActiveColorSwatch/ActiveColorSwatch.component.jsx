import React from 'react';

const ActiveColorSwatch = ({ color, onClick }) => {
  return (
    <button
      className='active-color-swatch'
      style={{
        display: 'inline-block',
        backgroundColor: color,
        width: '3.8rem',
        height: '3.8rem',
        borderRadius: '100%',
        margin: '.4rem',
        cursor: 'pointer',
      }}
      onClick={onClick}
    ></button>
  );
};

export default ActiveColorSwatch;
