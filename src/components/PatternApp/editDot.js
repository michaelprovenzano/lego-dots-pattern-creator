import LEGOElement from '../../logic/LEGOElement';

const EditDot = ({ element, editor, pattern, setEditor, setPatterns }) => {
  if (!element) return null;

  let { dot, isLocked, row, col } = element;
  if (isLocked) return setPatterns({ single: pattern });

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
};

export default EditDot;