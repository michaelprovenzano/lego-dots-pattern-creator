import { useEffect, useState, Fragment } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setEditor } from '../../redux/editor/editor.actions';

import Dot from './Dot.component';

const Dots = ({ pattern, viewport, center, generatorSettings, patterns }) => {
  const [dotsLayer, setDotsLayer] = useState(null);
  const studSize = generatorSettings.studSize;

  useEffect(() => {
    let layer = new PIXI.Container();
    viewport.addChild(layer);
    setDotsLayer(layer);

    return () => {
      if (!dotsLayer) return;
      viewport.removeChild(dotsLayer);
      dotsLayer.destroy();
    };
    // eslint-disable-next-line
  }, [pattern]);

  const dots = [];

  let y = 0;
  for (let r = 0; r < pattern.dots.length; r++) {
    let row = pattern.dots[r];
    let x = 0;
    for (let c = 0; c < pattern.dots[r].length; c++) {
      let [width, height] = [studSize * pattern.width, studSize * pattern.height];
      let element = row[c];

      dots.push({
        element: element,
        texture: patterns.textures[`${element.type} ${element.color.id}`],
        position: [
          center[0] - width / 2 + x + studSize / 2,
          center[1] - height / 2 + y + studSize / 2,
        ],
        row: r,
        col: c,
      });
      x += studSize;
    }
    y += studSize;
  }

  return (
    <Fragment>
      {dots &&
        dotsLayer &&
        dots.map((dot, i) => (
          <Dot
            key={`dot-${i}`}
            element={dot.element}
            row={dot.row}
            col={dot.col}
            texture={dot.texture}
            size={studSize}
            position={dot.position}
            layer={dotsLayer}
            pattern={pattern}
          />
        ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setEditor })(Dots);
