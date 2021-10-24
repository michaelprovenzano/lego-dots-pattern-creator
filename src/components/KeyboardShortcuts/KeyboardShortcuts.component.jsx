import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSettings } from '../../redux/settings/settings.actions';

const KeyboardShortcuts = ({ app, settings, setSettings }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  });

  const handleKeydown = e => {
    if (!app) return;
    switch (e.code) {
      case 'KeyA':
        setSettings({ editMode: 'add' });
        app.setEditMode('add');
        break;
      case 'KeyC':
        setSettings({ editMode: 'paint' });
        app.setEditMode('paint');
        break;
      case 'KeyD':
        setSettings({ editMode: 'delete' });
        app.setEditMode('delete');
        break;
      case 'KeyI':
      case 'KeyF':
        setSettings({ editMode: 'dropper' });
        app.setEditMode('dropper');
        break;
      case 'KeyR':
        setSettings({ editMode: 'rotate' });
        app.setEditMode('rotate');
        break;
      case 'KeyX':
        let type = settings.paintType;
        type === 'foreground' ? (type = 'background') : (type = 'foreground');
        setSettings({ paintType: type });
        app.setPaintType(type);
        break;
      case 'Digit1':
        setSettings({ addShape: '1x1 Tile' });
        app.setAddShape('1x1 Tile');
        break;
      case 'Digit2':
        setSettings({ addShape: '1x1 Tile Round' });
        app.setAddShape('1x1 Tile Round');
        break;
      case 'Digit3':
        setSettings({ addShape: '1x1 Tile Quarter Round' });
        app.setAddShape('1x1 Tile Quarter Round');
        break;
      case 'Digit4':
        setSettings({ addShape: '1x1 Tile Half Round' });
        app.setAddShape('1x1 Tile Half Round');
        break;
      default:
        break;
    }
  };

  return false;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setSettings })(KeyboardShortcuts);
