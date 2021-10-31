import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setEditor } from '../../redux/editor/editor.actions';
import LEGOElement from '../../logic/LEGOElement';

const Dots = ({
  pattern,
  viewport,
  editor,
  center,
  generatorSettings,
  patterns,
  setPatterns,
  setEditor,
}) => {
  useEffect(() => {
    console.log('rendering dots');
    const studSize = generatorSettings.studSize;
    let [width, height] = [studSize * pattern.width, studSize * pattern.height];
    const allDots = [];

    let layer = new PIXI.Container();
    viewport.addChild(layer);

    let y = 0;
    for (let r = 0; r < pattern.dots.length; r++) {
      let row = pattern.dots[r];
      let x = 0;
      for (let c = 0; c < pattern.dots[r].length; c++) {
        const el = row[c];
        const texture = patterns.textures[`${el.type} ${el.color.id}`];
        const sprite = new PIXI.Sprite(texture);
        sprite.width = studSize;
        sprite.height = studSize;
        sprite.anchor.set(0.5, 0.5);
        if (el.type !== 'Empty') sprite.angle = el.rotation;
        sprite.position.set(
          center[0] - width / 2 + x + studSize / 2,
          center[1] - height / 2 + y + studSize / 2
        );

        sprite.interactive = true;
        let viewMode = false;
        if (editor.viewMode === 'random') viewMode = true;
        sprite.click = e =>
          onClick(e, {
            dot: el,
            pattern,
            setPatterns,
            editor,
            setEditor,
            viewMode,
            row: r,
            col: c,
          });

        allDots.push(sprite); // cache for cleanup
        layer.addChild(sprite);

        x += studSize;
      }
      y += studSize;
    }

    const onClick = (e, { dot, pattern, setPatterns, viewMode, row, col }) => {
      let isAltDown = e.data.originalEvent.altKey;
      if (isAltDown) return;
      let dotEl = new LEGOElement(dot);

      if (viewMode) return setPatterns({ single: { ...pattern } });

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

    return () => {
      allDots.forEach(dot => {
        layer.removeChild(dot);
        dot.destroy();
      });
      viewport.removeChild(layer);
      layer.destroy();
    };
  }, [pattern, editor]);
  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setEditor })(Dots);
