import types from './generatorSettings.types';
import legoColors from '../../logic/legoColors';

const INITIAL_STATE = {
  patternSize: { width: 6, height: 6 },
  maxColors: 4,
  density: 50,
  '1x1Tile': {
    colors: legoColors,
    density: 50,
  },
  '1x1TileRound': {
    colors: legoColors,
    density: 50,
  },
  '1x1TileHalfRound': {
    colors: legoColors,
    density: 50,
  },
  '1x1TileQuarterRound': {
    colors: legoColors,
    density: 50,
  },
  plateColors: legoColors,
};

const generatorSettingsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_GENERATOR_SETTINGS:
      return { ...state, ...payload };
    case types.CLEAR_GENERATOR_SETTINGS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default generatorSettingsReducer;
