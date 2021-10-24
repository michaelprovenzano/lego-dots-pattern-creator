import types from './settings.types';
import legoColors from '../../logic/legoColors';

const INITIAL_STATE = {
  editMode: 'add',
  viewMode: 'single',
  paintColor: legoColors[3],
  paintType: 'foreground',
  addShape: '1x1 Tile',
  patternSize: { width: 6, height: 6 },
  dotColors: [...legoColors],
  plateColors: [...legoColors],
};

const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_SETTINGS:
      return { ...state, ...payload };
    case types.CLEAR_SETTINGS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default appReducer;
