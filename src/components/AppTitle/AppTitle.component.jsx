import React from 'react';
import './AppTitle.styles.scss';

import { ReactComponent as Logo } from '../../images/logo.svg';

const AppTitle = () => {
  return (
    <div className='app-title'>
      <Logo height={80} />
    </div>
  );
};

export default AppTitle;
