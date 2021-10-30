import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

const Dot = ({ dot, layer }) => {
  useEffect(() => {
    // let studSize = 50;

    // let layer = new PIXI.Container();
    // viewport.addChild(layer);

    // const texture = new PIXI.Texture.from(dot.svg());
    // const sprite = new PIXI.Sprite(texture);
    // sprite.width = studSize;
    // sprite.height = studSize;
    // sprite.position.set(position);

    // sprite.interactive = true;
    // sprite.click = () => {};

    layer.addChild(dot);

    // const onClick = (e, dot) => {
    //   let isAltDown = e.data.originalEvent.altKey;
    //   if (isAltDown) return;

    //   //
    //   switch (editor.editMode) {
    //     case 'add':
    //       dot.add(editor.addShape, editor.paintColor);
    //       break;
    //     case 'rotate':
    //       dot.rotate();
    //       break;
    //     case 'delete':
    //       dot.delete();
    //       break;
    //     case 'paint':
    //       if (editor.paintType === 'foreground') dot.setColor(editor.paintColor);
    //       if (editor.paintType === 'background') this.pattern.plate.setColor(this.paintColor);
    //       break;
    //     case 'dropper':
    //       let color = dot.getColor();
    //       if (color) this.setPaintColor(color);
    //       if (this.afterDropper) this.afterDropper(this);
    //       break;
    //     default:
    //       break;
    //   }
    // }

    return () => {
      // console.log('dot unmounted');
      // layer.removeChild(dot);
    };
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Dot);
