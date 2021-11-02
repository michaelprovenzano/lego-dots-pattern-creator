import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setEditor } from '../../redux/editor/editor.actions';

const KeyboardShortcuts = ({ app, viewport, editor, generatorSettings, setEditor }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  });

  const handleKeydown = e => {
    if (!app) return;
    switch (e.code) {
      case 'KeyA':
        setEditor({ editMode: 'add' });
        break;
      case 'KeyC':
        setEditor({ editMode: 'paint' });
        break;
      case 'KeyD':
        setEditor({ editMode: 'delete' });
        break;
      case 'KeyI':
      case 'KeyF':
        setEditor({ editMode: 'dropper' });
        break;
      case 'KeyR':
        setEditor({ editMode: 'rotate' });
        break;
      case 'KeyX':
        let type = editor.paintType;
        type === 'foreground' ? (type = 'background') : (type = 'foreground');
        setEditor({ paintType: type });
        break;
      case 'Digit0':
      case 'Numpad0':
        viewport.animate({
          time: 100,
          position: {
            x: generatorSettings.worldDimensions.width / 2,
            y: generatorSettings.worldDimensions.height / 2,
          },
          scale: 1,
        });
        break;
      case 'Digit1':
        setEditor({ addShape: '1x1 Tile' });
        break;
      case 'Digit2':
        setEditor({ addShape: '1x1 Tile Round' });
        break;
      case 'Digit3':
        setEditor({ addShape: '1x1 Tile Quarter Round' });
        break;
      case 'Digit4':
        setEditor({ addShape: '1x1 Tile Half Round' });
        break;
      default:
        break;
    }
  };

  return false;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setEditor })(KeyboardShortcuts);
