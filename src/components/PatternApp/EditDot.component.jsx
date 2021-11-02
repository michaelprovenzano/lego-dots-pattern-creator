import { useEffect } from 'react';
import { connect } from 'react-redux';
import LEGOElement from '../../logic/LEGOElement';

import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setEditor } from '../../redux/editor/editor.actions';

const EditDot = ({ editor, patterns, setEditor, setPatterns, currentEl, setCurrentEl }) => {
  useEffect(() => {
    if (!currentEl) return null;

    let e = currentEl.event;
    let element = currentEl.element;
    let { dot, isLocked, row, col } = element;
    if (isLocked) return null;

    let pattern = patterns.single;

    setCurrentEl(null);

    let isAltDown = e.data.originalEvent.altKey;
    if (isAltDown) return null;

    let dotEl = new LEGOElement(dot);

    switch (editor.editMode) {
      case 'add':
        dotEl.setType(editor.addShape);
        dotEl.setColor(editor.paintColor);
        updatePattern();
        break;
      case 'rotate':
        dotEl.rotate(90);
        updatePattern();
        break;
      case 'delete':
        dotEl.delete();
        updatePattern();
        break;
      case 'paint':
        if (editor.paintType === 'foreground') {
          dotEl.setColor(editor.paintColor);
          updatePattern();
        }
        if (editor.paintType === 'background') pattern.plateColor = editor.paintColor;
        break;
      case 'dropper':
        let color = dotEl.getColor();
        setEditor({ paintColor: color });
        break;
      default:
        break;
    }

    function updatePattern() {
      pattern['dots'][row][col] = dotEl.data();
      setPatterns({ single: { ...pattern } });
    }
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setEditor })(EditDot);
