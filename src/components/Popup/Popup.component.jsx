import React from 'react';
import './Popup.styles.scss';

const Modal = ({ children, isOpen }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className='popup__body'>{children}</div>
    </div>
  );
};

export default Modal;
