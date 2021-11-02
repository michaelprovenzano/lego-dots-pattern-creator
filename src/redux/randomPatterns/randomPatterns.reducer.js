import types from './randomPatterns.types';

const INITIAL_STATE = null;

const patternsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_RANDOM_PATTERNS:
      return [...payload];
    case types.CLEAR_RANDOM_PATTERNS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default patternsReducer;
