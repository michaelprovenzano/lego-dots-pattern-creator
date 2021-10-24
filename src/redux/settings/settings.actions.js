import types from './settings.types';

export const setSettings = settings => dispatch => {
  return dispatch({
    type: types.SET_SETTINGS,
    payload: settings,
  });
};

export const clearSettings = () => dispatch => {
  return dispatch({
    type: types.CLEAR_SETTINGS,
  });
};
