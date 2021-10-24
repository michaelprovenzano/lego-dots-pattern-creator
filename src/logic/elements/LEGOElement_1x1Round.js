import LEGOElement from './LEGOElement';

class LEGOElement_1x1Round extends LEGOElement {
  constructor(settings) {
    super(settings);
    this.type = '1x1 Tile Round';
    this.flatEdge = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };
    this.svg = this.svg.bind(this);
  }

  svg() {
    const { red, green, blue } = this.color.rgb;
    const { rotation, flipX, flipY } = this;

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg) ${
      flipX ? 'scaleX(-1)' : ''
    } ${flipY ? 'scaleY(-1)' : ''};" xml:space="preserve">
            <circle  fill="rgb(${red}, ${green}, ${blue})" cx="50" cy="50" r="50"/>
            </svg>
            `;
  }
}

export default LEGOElement_1x1Round;
