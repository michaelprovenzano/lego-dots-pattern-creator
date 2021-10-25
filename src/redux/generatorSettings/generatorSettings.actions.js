import types from './generatorSettings.types';

export const setGeneratorSettings = settings => dispatch => {
  return dispatch({
    type: types.SET_GENERATOR_SETTINGS,
    payload: settings,
  });
};

export const clearGeneratorSettings = () => dispatch => {
  return dispatch({
    type: types.CLEAR_GENERATOR_SETTINGS,
  });
};
