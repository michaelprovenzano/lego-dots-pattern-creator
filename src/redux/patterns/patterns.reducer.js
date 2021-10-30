import types from './patterns.types';

const INITIAL_STATE = {
  single: null,
  multiplePatterns: [],
  patternsLayer: null,
};

const patternsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_PATTERNS:
      return { ...state, ...payload };
    case types.CLEAR_PATTERNS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default patternsReducer;
