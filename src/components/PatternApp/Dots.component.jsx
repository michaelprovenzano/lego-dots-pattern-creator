import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setEditor } from '../../redux/editor/editor.actions';

const Dots = ({ pattern, viewport, editor, center, generatorSettings, setPatterns, setEditor }) => {
  useEffect(() => {
    const studSize = generatorSettings.studSize;
    let [width, height] = [studSize * pattern.width, studSize * pattern.height];

    let layer = new PIXI.Container();
    viewport.addChild(layer);

    let y = 0;
    for (let row of pattern.dots) {
      let x = 0;
      for (let el of row) {
        const texture = new PIXI.Texture.from(el.svg());
        const sprite = new PIXI.Sprite(texture);
        sprite.width = studSize;
        sprite.height = studSize;
        sprite.x = x;
        sprite.y = y;
        sprite.position.set(center[0] - width / 2 + x, center[1] - height / 2 + y);

        sprite.interactive = true;
        let viewMode = false;
        if (editor.viewMode === 'random') viewMode = true;
        sprite.click = e =>
          onClick(e, { dot: el, pattern, setPatterns, editor, setEditor, viewMode });

        layer.addChild(sprite);

        x += studSize;
      }
      y += studSize;
    }

    const onClick = (e, { dot, pattern, setPatterns, editor, setEditor, viewMode }) => {
      let isAltDown = e.data.originalEvent.altKey;
      if (isAltDown) return;

      if (viewMode) return setPatterns({ single: { ...pattern } });

      switch (editor.editMode) {
        case 'add':
          dot.setType(editor.addShape);
          dot.setColor(editor.paintColor);
          setPatterns({ single: { ...pattern } });
          break;
        case 'rotate':
          dot.rotate(90);
          setPatterns({ single: { ...pattern } });
          break;
        case 'delete':
          dot.delete();
          setPatterns({ single: { ...pattern } });
          break;
        case 'paint':
          if (editor.paintType === 'foreground') dot.setColor(editor.paintColor);
          if (editor.paintType === 'background') pattern.plateColor = editor.paintColor;
          setPatterns({ single: { ...pattern } });
          break;
        case 'dropper':
          let color = dot.getColor();
          setEditor({ paintColor: color });
          break;
        default:
          break;
      }
    };

    return () => {
      viewport.removeChild(layer);
    };
  });
  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setEditor })(Dots);
