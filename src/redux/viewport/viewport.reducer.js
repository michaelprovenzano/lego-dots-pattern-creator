import types from './viewport.types';

const INITIAL_STATE = null;

const viewportReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_VIEWPORT:
      return payload;
    case types.CLEAR_VIEWPORT:
      return null;
    default:
      return state;
  }
};

export default viewportReducer;
