import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import settingsReducer from './settings/settings.reducer';
import generatorSettingsReducer from './generatorSettings/generatorSettings.reducer';
import patternsReducer from './patterns/patterns.reducer';
import randomPatternsReducer from './randomPatterns/randomPatterns.reducer';
import viewportReducer from './viewport/viewport.reducer';
import editorReducer from './editor/editor.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  settings: settingsReducer,
  editor: editorReducer,
  generatorSettings: generatorSettingsReducer,
  patterns: patternsReducer,
  randomPatterns: randomPatternsReducer,
  viewport: viewportReducer,
});

export default rootReducer;
