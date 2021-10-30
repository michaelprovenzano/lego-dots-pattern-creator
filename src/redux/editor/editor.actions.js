import types from './editor.types';

export const setEditor = editor => dispatch => {
  return dispatch({
    type: types.SET_EDITOR,
    payload: editor,
  });
};

export const clearEditor = () => dispatch => {
  return dispatch({
    type: types.CLEAR_EDITOR,
  });
};
