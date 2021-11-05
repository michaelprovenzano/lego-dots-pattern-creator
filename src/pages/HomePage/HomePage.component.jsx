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
          top: '3rem',
          left: '3rem',
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
