import * as PIXI from 'pixi.js';
import Pattern from './Pattern';
import DOT from './DOT';
import Plate from './Plate';
import { getRandom, rgbToHex } from './utils';
import legoColors from './legoColors';

class PixiApp {
  constructor(viewport, options) {
    if (!options) options = {};
    const { afterDropper, app } = options;

    this.viewport = viewport;
    this.editMode = 'add';
    this.viewMode = 'single';
    this.paintColor = legoColors[3];
    this.paintType = 'foreground';
    this.addShape = '1x1 Tile';
    this.patternSize = { width: 6, height: 6 };
    this.dotColors = [...legoColors];
    this.plateColors = [...legoColors];
    this.pattern = null;
    this.app = app;

    // Callbacks
    this.afterDropper = afterDropper;

    this.newPattern = this.newPattern.bind(this);
    this.onClick = this.onClick.bind(this);

    this.setAddShape = this.setAddShape.bind(this);
    this.getAddShape = this.getAddShape.bind(this);

    this.setEditMode = this.setEditMode.bind(this);
    this.getEditMode = this.getEditMode.bind(this);

    this.setViewMode = this.setViewMode.bind(this);
    this.getViewMode = this.getViewMode.bind(this);

    this.setPaintType = this.setPaintType.bind(this);
    this.getPaintType = this.getPaintType.bind(this);

    this.setPaintColor = this.setPaintColor.bind(this);
    this.getPaintColor = this.getPaintColor.bind(this);
  }

  newPattern(options) {
    if (!options) options = {};
    let { width = 6, height = 6, dotColors = legoColors, plateColors = legoColors } = options;
    if (this.dotLayer) this.viewport.removeChild(this.dotLayer);
    if (this.plateLayer) this.viewport.removeChild(this.plateLayer);
    const worldWidth = 1000;
    const worldHeight = 1000;
    const worldCenter = [worldWidth / 2, worldHeight / 2];

    let studSize = 50;
    let plateWidth = width * studSize;
    let plateHeight = height * studSize;
    const patternCenter = [worldCenter[0] - plateWidth / 2, worldCenter[1] - plateHeight / 2];
    let pattern = new Pattern({ width, height, dotColors, plateColors: dotColors });

    let plateLayer = (this.plateLayer = new PIXI.Container());
    this.viewport.addChild(plateLayer);

    var plate = new PIXI.Graphics();
    let plateColor = getRandom(plateColors);
    const { red, green, blue } = plateColor.rgb;
    plate.beginFill(eval(`0x${rgbToHex(red, green, blue)}`));
    plate.drawRect(0, 0, plateWidth, plateHeight);
    plate.endFill();
    let plateTexture = this.app.renderer.generateTexture(plate);
    let plateSprite = new PIXI.Sprite(plateTexture);
    [plateSprite.x, plateSprite.y] = patternCenter;
    plateLayer.addChild(plateSprite);

    let plateEl = new Plate({
      color: plateColor,
      sprite: plateSprite,
      container: plateLayer,
      onClick: this.onClick,
      app: this.app,
    });

    let dotLayer = (this.dotLayer = new PIXI.Container());
    this.viewport.addChild(dotLayer);

    this.pattern = { dots: [], plate: plateEl };

    let dots = pattern.dots;

    let y = 0;
    for (let row of dots) {
      let x = 0;
      for (let el of row) {
        const texture = new PIXI.Texture.from(el.svg());
        const sprite = new PIXI.Sprite(texture);
        sprite.width = studSize;
        sprite.height = studSize;
        sprite.x = x;
        sprite.y = y;
        sprite.position.set(
          worldCenter[0] - plateWidth / 2 + x,
          worldCenter[1] - plateHeight / 2 + y
        );
        let dot = new DOT({
          element: el,
          sprite,
          container: dotLayer,
          onClick: this.onClick,
          app: this,
        });
        this.pattern.dots.push(dot);
        dot.render();
        x += studSize;
      }
      y += studSize;
    }
  }

  setAddShape(shape) {
    this.addShape = shape;
  }

  getAddShape() {
    return this.addShape;
  }

  setEditMode(mode) {
    this.editMode = mode;
  }

  getEditMode() {
    return this.editMode;
  }

  setViewMode(mode) {
    this.viewMode = mode;
  }

  getViewMode(mode) {
    return this.viewMode;
  }

  setPaintType(type) {
    this.paintType = type;
  }

  getPaintType() {
    return this.paintType;
  }

  setPaintColor(color) {
    this.paintColor = color;
  }

  getPaintColor() {
    return this.paintColor;
  }

  onClick(e, dot) {
    let isAltDown = e.data.originalEvent.altKey;
    if (isAltDown) return;

    switch (this.editMode) {
      case 'add':
        dot.add(this.addShape, this.paintColor);
        break;
      case 'rotate':
        dot.rotate();
        break;
      case 'delete':
        dot.delete();
        break;
      case 'paint':
        if (this.paintType === 'foreground') dot.setColor(this.paintColor);
        if (this.paintType === 'background') this.pattern.plate.setColor(this.paintColor);
        break;
      case 'dropper':
        let color = dot.getColor();
        if (color) this.setPaintColor(color);
        if (this.afterDropper) this.afterDropper(this);
        break;
      default:
        break;
    }
  }
}

export default PixiApp;
