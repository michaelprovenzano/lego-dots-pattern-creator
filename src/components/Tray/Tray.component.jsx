import React from 'react';
import './Tray.styles.scss';

import { connect } from 'react-redux';

import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import GeneratePatternButton from '../GeneratePatternButton/GeneratePatternButton.component';

import { ReactComponent as PartsListIcon } from '../../images/icon-parts-list.svg';
import { ReactComponent as SettingsIcon } from '../../images/icon-settings.svg';
import { ReactComponent as JPGIcon } from '../../images/icon-jpg.svg';
import { ReactComponent as DownloadIcon } from '../../images/icon-download.svg';
import { ReactComponent as PatternSettingsIcon } from '../../images/icon-pattern-settings.svg';
import { ReactComponent as MultiplePatternsIcon } from '../../images/icon-multiple-patterns.svg';
import { ReactComponent as RandomPatternsIcon } from '../../images/icon-random-patterns.svg';
import { ReactComponent as SinglePatternIcon } from '../../images/icon-single-pattern.svg';
import { ReactComponent as GeneratePatternIcon } from '../../images/icon-generate-pattern.svg';
import { ReactComponent as SeparatorIcon } from '../../images/icon-separator.svg';

import { setSettings } from '../../redux/settings/settings.actions';

const Tray = ({ app, settings, setSettings }) => {
  const black = '#072126';
  const primary = '#1E95AC';

  return (
    <div className='tray'>
      <ButtonBubble>
        <SettingsIcon stroke={black} />
      </ButtonBubble>
      <div className='tray__middle'>
        <ButtonBubble>
          <PartsListIcon stroke={black} />
        </ButtonBubble>
        <SeparatorIcon className='separator' />
        <ButtonBubble>
          <DownloadIcon stroke={black} />
        </ButtonBubble>
        <ButtonBubble>
          <JPGIcon stroke={black} />
        </ButtonBubble>
        <SeparatorIcon className='separator' />
        <ButtonBubble>
          <PatternSettingsIcon stroke={black} />
        </ButtonBubble>
        <ButtonBubble active={settings.viewMode === 'single'}>
          <SinglePatternIcon stroke={settings.viewMode === 'single' ? 'white' : black} />
        </ButtonBubble>
        <ButtonBubble active={settings.viewMode === 'repeated'}>
          <MultiplePatternsIcon stroke={settings.viewMode === 'repeated' ? 'white' : black} />
        </ButtonBubble>
        <ButtonBubble active={settings.viewMode === 'random'}>
          <RandomPatternsIcon stroke={settings.viewMode === 'random' ? 'white' : black} />
        </ButtonBubble>
      </div>
      <GeneratePatternButton />
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setSettings })(Tray);
