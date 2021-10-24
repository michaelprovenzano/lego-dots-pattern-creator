import React from 'react';
import './Button_Bubble.styles.scss';

const Button_Bubble = ({ children, active, onClick }) => {
  return (
    <button className={`button-bubble ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button_Bubble;
