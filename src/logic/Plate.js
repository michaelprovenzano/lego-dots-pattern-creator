import * as PIXI from 'pixi.js';
import { rgbToHex } from '../logic/utils';

class Plate {
  constructor({ color, sprite, container, app, onClick }) {
    this.id = Date.now();
    this.color = color;
    this.sprite = sprite;
    this.sprite.interactive = true;
    this.sprite.click = e => {
      if (onClick) onClick(e, this);
    };
    this.container = container;
    this.app = app;

    this.setColor = this.setColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.render = this.render.bind(this);
  }

  setColor(color) {
    this.color = color;
    this.render();
  }

  getColor() {
    return this.color;
  }

  render() {
    var plate = new PIXI.Graphics();

    console.log(this.app);

    const { red, green, blue } = this.color.rgb;
    plate.beginFill(eval(`0x${rgbToHex(red, green, blue)}`));
    plate.drawRect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    plate.endFill();

    let texture = this.app.renderer.generateTexture(plate);
    let sprite = new PIXI.Sprite(texture);

    sprite.x = this.sprite.x;
    sprite.y = this.sprite.y;
    sprite.width = this.sprite.width;
    sprite.height = this.sprite.height;
    sprite.interactive = true;
    sprite.click = this.sprite.click;

    this.container.removeChild(this.sprite);
    this.sprite = sprite;

    this.container.addChild(sprite);
  }
}

export default Plate;
