import LEGOElement_Empty from './elements/LEGOElement_Empty';
import elementTypes from './ElementTypes';
import * as PIXI from 'pixi.js';

class DOT {
  constructor({ element, sprite, container, app, onClick }) {
    this.id = Date.now();
    this.element = element;
    this.sprite = sprite;
    this.sprite.interactive = true;
    this.sprite.click = e => {
      if (onClick) onClick(e, this);
    };
    this.container = container;
    this.app = app;

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.rotate = this.rotate.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.render = this.render.bind(this);
  }

  add(type, color) {
    this.element = new elementTypes[type]({ color });
    this.render();
  }

  delete() {
    this.element = new LEGOElement_Empty();
    this.render();
  }

  rotate() {
    this.element.rotate(90);
    this.render();
  }

  setColor(color) {
    this.element.setColor(color);
    this.render();
  }

  getColor() {
    return this.element.color;
  }

  render() {
    let texture = new PIXI.Texture.from(this.element.svg());
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

export default DOT;
