import React from 'react';
import './SettingsHome.styles.scss';
import InputText from '../../../components/InputText/InputText.component';
import InputRange from '../../../components/InputRange/InputRange.component';
import { connect } from 'react-redux';
import { setGeneratorSettings } from '../../../redux/generatorSettings/generatorSettings.actions';

const SettingsHome = ({ generatorSettings, setGeneratorSettings }) => {
  let { maxColors, density } = generatorSettings;
  let { width, height } = generatorSettings.patternSize;

  return (
    <div className='settings-home'>
      <div className='settings-home__container'>
        <form className='settings-home__form'>
          <div className='row'>
            <div className='col'>
              <InputText
                id='pattern-width'
                name='pattern-width'
                label='Pattern Width'
                value={width}
                onChange={e =>
                  setGeneratorSettings({ patternSize: { width: e.target.value, height } })
                }
              />
            </div>
            <div className='col'>
              <InputText
                id='pattern-height'
                name='pattern-height'
                label='Pattern Height'
                value={height}
                onChange={e =>
                  setGeneratorSettings({ patternSize: { height: e.target.value, width } })
                }
              />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <InputText
                id='colors-per-pattern'
                name='colors-per-pattern'
                label='Maximum Colors per Pattern'
                value={maxColors}
                onChange={e => setGeneratorSettings({ maxColors: e.target.value })}
              />
              <div className='divider'></div>
              <InputRange
                id='pattern-density'
                name='pattern-density'
                label='Pattern Density'
                labelBefore='Less Empty'
                labelAfter='More Empty'
                min={0}
                max={10}
                value={density}
                onChange={e => setGeneratorSettings({ density: e.target.value })}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setGeneratorSettings })(SettingsHome);
