import React from 'react';
import './InputRange.styles.scss';

const InputRange = ({
  id,
  name,
  min,
  max,
  label,
  labelBefore,
  labelAfter,
  onChange,
  ...otherProps
}) => {
  return (
    <div className='input-range'>
      <label htmlFor={id}>{label}</label>
      <div className='input-range__slider'>
        <div className='input-range__label-before'>{labelBefore}</div>
        <input
          type='range'
          name={name}
          id={id}
          min={min}
          max={max}
          onChange={onChange}
          {...otherProps}
        />
        <div className='input-range__label-after'>{labelAfter}</div>
      </div>
    </div>
  );
};

export default InputRange;
