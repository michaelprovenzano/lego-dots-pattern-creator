import React, { useEffect, useState, useRef } from 'react';
import './SettingsColors.styles.scss';

import legoColors from '../../../logic/legoColors';
import InputRange from '../../../components/InputRange/InputRange.component';
import InputCheckbox from '../../../components/InputCheckbox/InputCheckbox.component';
import { connect } from 'react-redux';
import { setGeneratorSettings } from '../../../redux/generatorSettings/generatorSettings.actions';

const SettingsColors = ({ element, generatorSettings, setGeneratorSettings }) => {
  let [shift, setShift] = useState(false);
  let [startIndex, setStartIndex] = useState(null);
  let [selectedColors, setSelectedColors] = useState(null);

  let density = generatorSettings[element]['density'];

  useEffect(() => {
    window.addEventListener('keydown', e => setShift(e.shiftKey));
    window.addEventListener('keyup', e => setShift(e.shiftKey));

    let selected = {};
    let selectedColors = generatorSettings[element]['colors'];
    for (let color of legoColors) {
      selected[color.id] = false;
    }
    for (let color of selectedColors) {
      selected[color.id] = true;
    }
    setSelectedColors(selected);
  }, [element, generatorSettings]);

  const setColors = (color, i) => {
    let newColors;
    if (startIndex >= 0 && shift) {
      let start = startIndex;
      let difference = Math.abs(i - startIndex);
      let reverse = i - startIndex < 0;

      newColors = { ...selectedColors };
      let newColorKeys = Object.keys(selectedColors);

      let end = start + difference;
      if (reverse) {
        end = start - difference;
        [start, end] = [end, start];
        newColorKeys.forEach((key, j) => {
          if (j >= start && j < end) newColors[key] = !newColors[key];
        });
      } else {
        newColorKeys.forEach((key, j) => {
          if (j > start && j <= end) newColors[key] = !newColors[key];
        });
      }

      setStartIndex(null);
    } else {
      setStartIndex(i);
      newColors = { ...selectedColors, [color.id]: !selectedColors[color.id] };
    }

    setSelectedColors(newColors);
    let colors = legoColors.filter(c => newColors[c.id]);

    setGeneratorSettings({
      [element]: { colors, density },
    });
  };

  return (
    <div className='settings-colors'>
      <div className='settings-colors__container'>
        <form className='settings-colors__form'>
          {selectedColors &&
            legoColors.map((c, i) => (
              <InputCheckbox
                key={`color-${i}`}
                label={c.name}
                checked={selectedColors[c.id] ? true : false}
                id={`color-${i}`}
                checkboxStyle={{
                  backgroundColor: `rgb(${c.rgb.red}, ${c.rgb.green}, ${c.rgb.blue})`,
                }}
                className='col'
                onChange={e => setColors(c, i)}
              />
            ))}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setGeneratorSettings })(SettingsColors);
