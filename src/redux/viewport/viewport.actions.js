import types from './viewport.types';

export const setViewport = viewport => dispatch => {
  return dispatch({
    type: types.SET_VIEWPORT,
    payload: viewport,
  });
};

export const clearViewport = () => dispatch => {
  return dispatch({
    type: types.CLEAR_VIEWPORT,
  });
};
