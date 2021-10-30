import React from 'react';
import './InputCheckbox.styles.scss';

import { ReactComponent as CheckIcon } from '../../images/icon-check-circle.svg';

const InputCheckbox = ({ id, name, label, checked, checkboxStyle, onChange }) => {
  return (
    <label htmlFor={id} className='input-checkbox'>
      <input type='checkbox' name={name} id={id} checked={checked} onChange={onChange} />
      <div className='input-checkbox__checkbox' style={checkboxStyle}>
        {checked && <CheckIcon />}
      </div>
      <div className='input-checkbox__label'>{label}</div>
    </label>
  );
};

export default InputCheckbox;
