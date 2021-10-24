import LEGOElement from './LEGOElement';

class LEGOElement_1x1HalfRound extends LEGOElement {
  constructor(settings) {
    super(settings);
    this.type = '1x1 Tile Half Round';
    this.flatEdge = {
      top: false,
      right: false,
      bottom: true,
      left: false,
    };
    this.flipX = this.flipX.bind(this);
    this.flipY = this.flipY.bind(this);
    this.svg = this.svg.bind(this);
  }

  flipX() {
    switch (this.rotation) {
      case 90:
        this.setRotation(270);
        break;
      case 270:
        this.setRotation(90);
        break;
      default:
        break;
    }
    return;
  }

  flipY() {
    switch (this.rotation) {
      case 0:
        this.setRotation(180);
        break;
      case 180:
        this.setRotation(0);
        break;
      default:
        break;
    }
    return;
  }

  svg() {
    const { red, green, blue } = this.color.rgb;

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${this.rotation}deg);" xml:space="preserve">
        <g>
            <path fill="rgb(${red}, ${green}, ${blue})" d="M97.04,100H2.96C1.33,100,0,98.67,0,97.04V50C0,22.39,22.39,0,50,0h0c27.61,0,50,22.39,50,50v47.04
                C100,98.67,98.67,100,97.04,100z"/>
        </g>
        </svg>`;
  }
}

export default LEGOElement_1x1HalfRound;
