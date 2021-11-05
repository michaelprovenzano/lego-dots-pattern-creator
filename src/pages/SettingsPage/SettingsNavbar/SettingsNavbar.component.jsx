import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SettingsNavbar.styles.scss';

import ButtonBubble from '../../../components/Button_Bubble/Button_Bubble.component';
import { ReactComponent as HomeSettingIcon } from '../../../images/icon-settings-home.svg';
import { ReactComponent as TileSettingIcon } from '../../../images/icon-settings-tile.svg';
import { ReactComponent as RoundSettingsIcon } from '../../../images/icon-settings-round.svg';
import { ReactComponent as HalfRoundSettingsIcons } from '../../../images/icon-settings-half-round.svg';
import { ReactComponent as QuarterRoundSettingsIcon } from '../../../images/icon-settings-quarter-round.svg';
import { ReactComponent as PlateSettingsIcon } from '../../../images/icon-settings-plate.svg';
import { ReactComponent as SeparatorIcon } from '../../../images/icon-separator.svg';
import { ReactComponent as CloseIcon } from '../../../images/icon-close.svg';
import { connect } from 'react-redux';

import { colors } from '../../../variables';
let { black } = colors;

const SettingsNavbar = () => {
  const [active, setActive] = useState('home');

  return (
    <div className='settings-navbar'>
      <div className='settings-navbar__left'>
        <Link to='/pattern-settings/home' onClick={e => setActive('home')}>
          <ButtonBubble active={active === 'home'}>
            <HomeSettingIcon fill={active === 'home' ? 'white' : black} />
          </ButtonBubble>
        </Link>
        <SeparatorIcon />
        <Link to='/pattern-settings/1x1-tile' onClick={e => setActive('1x1-tile')}>
          <ButtonBubble active={active === '1x1-tile'}>
            <TileSettingIcon fill={active === '1x1-tile' ? 'white' : black} />
          </ButtonBubble>
        </Link>
        <Link to='/pattern-settings/1x1-tile-round' onClick={e => setActive('1x1-tile-round')}>
          <ButtonBubble active={active === '1x1-tile-round'}>
            <RoundSettingsIcon fill={active === '1x1-tile-round' ? 'white' : black} />
          </ButtonBubble>
        </Link>
        <Link
          to='/pattern-settings/1x1-tile-half-round'
          onClick={e => setActive('1x1-tile-half-round')}
        >
          <ButtonBubble active={active === '1x1-tile-half-round'}>
            <HalfRoundSettingsIcons fill={active === '1x1-tile-half-round' ? 'white' : black} />
          </ButtonBubble>
        </Link>
        <Link
          to='/pattern-settings/1x1-tile-quarter-round'
          onClick={e => setActive('1x1-tile-quarter-round')}
        >
          <ButtonBubble active={active === '1x1-tile-quarter-round'}>
            <QuarterRoundSettingsIcon
              fill={active === '1x1-tile-quarter-round' ? 'white' : black}
            />
          </ButtonBubble>
        </Link>
        <SeparatorIcon />
        <Link to='/pattern-settings/plate' onClick={e => setActive('plate')}>
          <ButtonBubble active={active === 'plate'}>
            <PlateSettingsIcon stroke={active === 'plate' ? 'white' : black} />
          </ButtonBubble>
        </Link>
        <SeparatorIcon />
        <div className='settings-navbar__name'>Pattern Generator Settings</div>
      </div>
      <div className='settings-navbar__right'>
        <Link to='/'>
          <CloseIcon />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(SettingsNavbar);
