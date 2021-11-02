import types from './randomPatterns.types';

export const setRandomPatterns = patterns => dispatch => {
  return dispatch({
    type: types.SET_RANDOM_PATTERNS,
    payload: patterns,
  });
};

export const clearRandomPatterns = () => dispatch => {
  return dispatch({
    type: types.CLEAR_RANDOM_PATTERNS,
  });
};
