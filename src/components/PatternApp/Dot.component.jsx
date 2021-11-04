import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import editDot from './editDot';

import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setEditor } from '../../redux/editor/editor.actions';

const Dot = ({
  element,
  texture,
  size,
  position,
  layer,
  row,
  col,
  editor,
  pattern,
  patterns,
  setEditor,
  setPatterns,
}) => {
  useEffect(() => {
    const sprite = new PIXI.Sprite(texture);
    sprite.width = size;
    sprite.height = size;
    sprite.anchor.set(0.5, 0.5);
    if (element.type !== 'Empty') sprite.angle = element.rotation;
    sprite.position.set(...position);

    sprite.interactive = true;
    let isLocked = false;
    if (editor.viewMode === 'random') isLocked = true;

    sprite.click = e => {
      let isAltDown = e.data.originalEvent.altKey;
      if (isAltDown) return null;
      editDot({
        element: {
          dot: element,
          isLocked,
          row,
          col,
        },
        editor,
        pattern,
        patterns,
        setEditor,
        setPatterns,
      });
    };

    layer.addChild(sprite);

    return () => {
      layer.removeChild(sprite);
      sprite.destroy();
    };
    // eslint-disable-next-line
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setEditor })(Dot);
