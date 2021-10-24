import types from './app.types';

const INITIAL_STATE = null;

const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_APP:
      return payload;
    case types.CLEAR_APP:
      return null;
    default:
      return state;
  }
};

export default appReducer;
