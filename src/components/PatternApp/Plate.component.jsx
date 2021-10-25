import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { rgbToHex } from '../../logic/utils';
import { connect } from 'react-redux';

const Plate = ({ pattern, viewport, location, app }) => {
  useEffect(() => {
    let { plateColor, width, height } = pattern;
    let studSize = 50;
    let [plateWidth, plateHeight] = [width * studSize, height * studSize];

    let layer = new PIXI.Container();
    viewport.addChild(layer);

    var plate = new PIXI.Graphics();
    const { red, green, blue } = plateColor.rgb;
    plate.beginFill(eval(`0x${rgbToHex(red, green, blue)}`));
    plate.drawRect(0, 0, plateWidth, plateHeight);
    plate.endFill();

    let plateTexture = app.renderer.generateTexture(plate);
    let plateSprite = new PIXI.Sprite(plateTexture);
    [plateSprite.x, plateSprite.y] = location || [0, 0];
    layer.addChild(plateSprite);

    return () => {
      layer.removeChild(plateSprite);
      viewport.removeChild(layer);
    };
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Plate);
