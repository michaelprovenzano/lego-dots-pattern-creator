import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { rgbToHex } from '../../logic/utils';
import { connect } from 'react-redux';

const Plate = ({ pattern, viewport, editor, generatorSettings, location, app }) => {
  useEffect(() => {
    if (!app.renderer) return;
    let { plateColor, width, height } = pattern;
    const studSize = generatorSettings.studSize;
    let [plateWidth, plateHeight] = [width * studSize, height * studSize];

    let layer = new PIXI.Container();
    viewport.addChild(layer);

    var plate = new PIXI.Graphics();
    const { red, green, blue } = plateColor.rgb;
    // eslint-disable-next-line
    plate.beginFill(eval(`0x${rgbToHex(red, green, blue)}`));
    plate.drawRect(0, 0, plateWidth, plateHeight);
    plate.endFill();

    let plateTexture = app.renderer.generateTexture(plate);
    let plateSprite = new PIXI.Sprite(plateTexture);
    [plateSprite.x, plateSprite.y] = location || [0, 0];
    layer.addChild(plateSprite);

    return () => {
      layer.removeChild(plateSprite);
      plateSprite.destroy();

      viewport.removeChild(layer);
      layer.destroy();
    };
  }, [pattern, generatorSettings]);

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Plate);
