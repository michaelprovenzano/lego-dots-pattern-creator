import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import settingsReducer from './settings/settings.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  settings: settingsReducer,
});

export default rootReducer;
