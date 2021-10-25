import types from './patterns.types';

export const setPatterns = patterns => dispatch => {
  return dispatch({
    type: types.SET_PATTERNS,
    payload: patterns,
  });
};

export const clearPatterns = () => dispatch => {
  return dispatch({
    type: types.CLEAR_PATTERNS,
  });
};
