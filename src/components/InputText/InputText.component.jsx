import React from 'react';
import './InputText.styles.scss';

const InputText = ({ id, name, label, value, className, onChange }) => {
  return (
    <div className='input-text'>
      <label htmlFor={id} className='input-text__label'>
        {label}
      </label>
      <input
        type='text'
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`input-text__input ${className}`}
      />
    </div>
  );
};

export default InputText;
