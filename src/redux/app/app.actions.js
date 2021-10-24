import types from './app.types';

export const setApp = app => dispatch => {
  return dispatch({
    type: types.SET_APP,
    payload: app,
  });
};

export const clearApp = () => dispatch => {
  return dispatch({
    type: types.CLEAR_APP,
  });
};
