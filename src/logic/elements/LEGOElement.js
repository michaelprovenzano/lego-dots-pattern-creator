class LEGOElement {
  constructor(options) {
    if (!options) options = {};
    let { color = null, rotation = 0, flatEdge = {} } = options;

    this.isLegoElement = true;
    this.rotation = rotation;
    this.color = color;
    this.flatEdge = {
      top: flatEdge.top || true,
      right: flatEdge.right || true,
      bottom: flatEdge.bottom || true,
      left: flatEdge.left || true,
    };
    this.type = '';

    this.rotate = this.rotate.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.rotate = this.rotate.bind(this);
    this.checkRotation = this.checkRotation.bind(this);
    this.setColor = this.setColor.bind(this);
    this.flipX = this.flipX.bind(this);
    this.flipY = this.flipY.bind(this);
  }

  flipX() {
    return true;
  }

  flipY() {
    return true;
  }

  checkRotation() {
    if ((this.rotation === 90 || this.rotation === 270) && this.flipX && this.flipY) {
      this.flipX = this.flipX;
      this.flipY = this.flipY;
    } else if ((this.rotation === 90 || this.rotation === 270) && (this.flipX || this.flipY)) {
      this.flipX = !this.flipX;
      this.flipY = !this.flipY;
    }

    return { flipX: this.flipX, flipY: this.flipY };
  }

  rotate(deg) {
    this.rotation += deg;
    if (this.rotation >= 360) this.rotation -= 360;
    if (this.rotation <= -360) this.rotation += 360;
  }

  setRotation(deg) {
    this.rotation = deg;
  }

  getRotation() {
    return this.rotation;
  }

  setColor(color) {
    this.color = color;
  }
}

export default LEGOElement;
