import types from './editor.types';
import legoColors from '../../logic/legoColors';

const INITIAL_STATE = {
  editMode: 'add',
  viewMode: 'single',
  paintColor: legoColors[3],
  paintType: 'foreground',
  addShape: '1x1 Tile',
};

const editorReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_EDITOR:
      return { ...state, ...payload };
    case types.CLEAR_EDITOR:
      return null;
    default:
      return state;
  }
};

export default editorReducer;
