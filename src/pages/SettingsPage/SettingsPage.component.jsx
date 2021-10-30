import React from 'react';
import { Route } from 'react-router-dom';

import SettingsNavbar from './SettingsNavbar/SettingsNavbar.component';
import SettingsHome from './SettingsHome/SettingsHome.component';
import SettingsColors from './SettingsColors/SettingsColors.component';
import SettingsPlate from './SettingsPlate/SettingsPlate.component';

const SettingsPage = () => {
  return (
    <div className='settings-page'>
      <SettingsNavbar />
      <Route path='/pattern-settings/home' component={SettingsHome} />
      <Route path='/pattern-settings/1x1-tile'>
        <SettingsColors element='1x1Tile' />
      </Route>
      <Route path='/pattern-settings/1x1-tile-round'>
        <SettingsColors element='1x1TileRound' />
      </Route>
      <Route path='/pattern-settings/1x1-tile-half-round'>
        <SettingsColors element='1x1TileHalfRound' />
      </Route>
      <Route path='/pattern-settings/1x1-tile-quarter-round'>
        <SettingsColors element='1x1TileQuarterRound' />
      </Route>
      <Route path='/pattern-settings/plate'>
        <SettingsPlate />
      </Route>
    </div>
  );
};

export default SettingsPage;
