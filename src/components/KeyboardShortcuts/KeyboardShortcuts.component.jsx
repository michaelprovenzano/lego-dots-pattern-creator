import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setEditor } from '../../redux/editor/editor.actions';

const KeyboardShortcuts = ({ app, viewport, patterns, editor, generatorSettings, setEditor }) => {
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
        handleFraming();
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

  const handleFraming = e => {
    let repeatX = generatorSettings.patternRepeatSize.width;
    let repeatY = generatorSettings.patternRepeatSize.height;

    let scale = 1;
    if (editor.viewMode === 'repeated' || editor.viewMode === 'random') {
      let widthRatio = 1 / repeatX;
      let heightRatio = 1 / repeatY;

      widthRatio > heightRatio ? (scale = widthRatio) : (scale = heightRatio);
    }

    viewport.animate({
      time: 100,
      position: {
        x: generatorSettings.worldDimensions.width / 2,
        y: generatorSettings.worldDimensions.height / 2,
      },
      scale,
    });
  };

  return false;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setEditor })(KeyboardShortcuts);
