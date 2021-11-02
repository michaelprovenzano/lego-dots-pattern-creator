import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';

const Dot = ({ element, texture, size, position, layer, row, col, setPatterns, onClick }) => {
  let isMounted = useRef(false);

  useEffect(() => {
    const sprite = new PIXI.Sprite(texture);
    sprite.width = size;
    sprite.height = size;
    sprite.anchor.set(0.5, 0.5);
    if (element.type !== 'Empty') sprite.angle = element.rotation;
    sprite.position.set(...position);

    sprite.interactive = true;
    let isLocked = false;

    sprite.click = event => {
      // Instead of putting this logic here, just set the active dot here
      if (onClick)
        onClick({
          event,
          element: {
            dot: element,
            isLocked,
            row,
            col,
          },
        });
    };

    layer.addChild(sprite);
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      layer.removeChild(sprite);
      sprite.destroy();
    };
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns })(Dot);
