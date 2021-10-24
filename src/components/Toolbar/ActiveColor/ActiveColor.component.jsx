import React, { useState, useEffect, useRef } from 'react';

import ButtonBubble from '../../Button_Bubble/Button_Bubble.component';
import Popup from '../../Popup/Popup.component';
import ActiveColorSwatch from '../ActiveColorSwatch/ActiveColorSwatch.component';
import { ReactComponent as ActiveColorIcon } from '../../../images/icon-active-color.svg';
import legoColors from '../../../logic/legoColors';

const ActiveColor = ({ activeColor, setSettings, app }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const current = ref.current;
    window.addEventListener('click', e => {
      if (!current.contains(e.target)) setIsOpen(false);
    });

    return window.removeEventListener('click', e => {
      if (!current.contains(e.target)) setIsOpen(false);
    });
  });

  return (
    <div className='active-color' style={{ position: 'relative' }} ref={ref}>
      <ButtonBubble onClick={e => setIsOpen(!isOpen)}>
        <ActiveColorIcon
          fill={`rgb(${activeColor.rgb.red}, ${activeColor.rgb.green}, ${activeColor.rgb.blue})`}
        />
      </ButtonBubble>
      <Popup isOpen={isOpen} style={{ minWidth: '50vw' }}>
        {legoColors.map((color, i) => (
          <ActiveColorSwatch
            color={`rgb(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`}
            onClick={e => {
              setIsOpen(false);
              setSettings({ paintColor: color });
              app.setPaintColor(color);
            }}
            key={i}
          />
        ))}
      </Popup>
    </div>
  );
};

export default ActiveColor;
