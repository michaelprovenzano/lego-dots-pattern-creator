import React, { Fragment } from 'react';
import './Button_Bubble.styles.scss';
import ReactTooltip from 'react-tooltip';

const Button_Bubble = ({ children, className, active, tip, tipPlace, id, ...otherProps }) => {
  return (
    <Fragment>
      <button
        className={`button-bubble ${active ? 'active' : ''} ${className}`}
        data-for={id}
        data-tip={tip}
        {...otherProps}
      >
        {children}
      </button>
      <ReactTooltip place={tipPlace} type='dark' effect='solid' id={id} delayShow='800' />
    </Fragment>
  );
};

export default Button_Bubble;
