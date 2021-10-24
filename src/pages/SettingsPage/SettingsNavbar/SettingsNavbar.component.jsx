import React from 'react';
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

const SettingsNavbar = () => {
  const black = '#072126';
  const primary = '#1E95AC';

  return (
    <div className='settings-navbar'>
      <div className='settings-navbar__left'>
        <ButtonBubble active={true}>
          <HomeSettingIcon fill={'white'} />
        </ButtonBubble>
        <SeparatorIcon />
        <ButtonBubble active={false}>
          <TileSettingIcon fill={black} />
        </ButtonBubble>
        <ButtonBubble active={false}>
          <RoundSettingsIcon fill={black} />
        </ButtonBubble>
        <ButtonBubble active={false}>
          <HalfRoundSettingsIcons fill={black} />
        </ButtonBubble>
        <ButtonBubble active={false}>
          <QuarterRoundSettingsIcon fill={black} />
        </ButtonBubble>
        <SeparatorIcon />
        <ButtonBubble active={false}>
          <PlateSettingsIcon stroke={black} />
        </ButtonBubble>
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

export default SettingsNavbar;
