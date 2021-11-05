import React from 'react';
import './InputNumber.styles.scss';

const InputNumber = ({ id, label, className, ...otherProps }) => {
  return (
    <div className='input-number'>
      <label htmlFor={id} className='input-number__label'>
        {label}
      </label>
      <input type='number' className={`input-number__input ${className || ''}`} {...otherProps} />
    </div>
  );
};

export default InputNumber;
