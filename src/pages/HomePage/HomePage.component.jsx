import React from 'react';
import Tray from '../../components/Tray/Tray.component';
import Toolbar from '../../components/Toolbar/Toolbar.component';
import AppTitle from '../../components/AppTitle/AppTitle.component';
import PatternApp from '../../components/PatternApp/PatternApp.component';
import KeyboardShortcuts from '../../components/KeyboardShortcuts/KeyboardShortcuts.component';

const HomePage = () => {
  return (
    <div className='home-page'>
      <KeyboardShortcuts />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <AppTitle />
      </div>
      <PatternApp />
      <Toolbar />
      <Tray />
    </div>
  );
};

export default HomePage;
