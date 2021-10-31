class LEGOElement {
  constructor(options) {
    if (!options) options = {};
    let { color = null, rotation = 0, type } = options;

    this.isLegoElement = true;
    this.type = type;
    this.rotation = rotation;
    this.color = color;

    this.data = this.data.bind(this);
    this.rotate = this.rotate.bind(this);
    this.setType = this.setType.bind(this);
    this.getType = this.getType.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.rotate = this.rotate.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.flipX = this.flipX.bind(this);
    this.flipY = this.flipY.bind(this);
    this.svg = this.svg.bind(this);
    this.delete = this.delete.bind(this);
  }

  data() {
    const { type, rotation, color } = this;
    return {
      type,
      rotation,
      color,
      svg: this.svg,
    };
  }

  flipX() {
    switch (this.type) {
      case '1x1 Tile Quarter Round':
        switch (this.rotation) {
          case 0:
            this.setRotation(270);
            break;
          case 90:
            this.setRotation(180);
            break;
          case 180:
            this.setRotation(90);
            break;
          case 270:
            this.setRotation(0);
            break;
          default:
            break;
        }
        break;
      case '1x1 Tile Half Round':
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
        break;
      default:
        break;
    }
  }

  flipY() {
    switch (this.type) {
      case '1x1 Tile Quarter Round':
        switch (this.rotation) {
          case 0:
            this.setRotation(90);
            break;
          case 90:
            this.setRotation(0);
            break;
          case 180:
            this.setRotation(270);
            break;
          case 270:
            this.setRotation(180);
            break;
          default:
            break;
        }
        break;
      case '1x1 Tile Half Round':
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
        break;
      default:
        break;
    }
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

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setColor(color) {
    this.color = color;
  }

  getColor(color) {
    return this.color;
  }

  delete() {
    this.type = 'Empty';
  }

  svg() {
    const { red, green, blue } = this.color.rgb;
    let { rotation } = this;
    let svg = '<svg></svg>';

    switch (this.type) {
      case 'Empty':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.99 95.92">
        <defs>
          <style>
            .cls-1 {
              fill: none;
            }
      
            .cls-1, .cls-2, .cls-3 {
              fill-rule: evenodd;
            }
      
            .cls-2 {
              fill: #fff;
              opacity: 0.2;
            }
      
            .cls-3 {
              opacity: 0.5;
            }
          </style>
        </defs>
        <g id="Layer_3" data-name="Layer 3">
          <path class="cls-1" d="M.35.08h96V96H.35Z" transform="translate(-0.35 -0.08)"/>
          <path class="cls-2" d="M48.85,20.85a27.69,27.69,0,0,0-18,48.72,27.7,27.7,0,0,1,39.07-39A27.61,27.61,0,0,0,48.85,20.85Z" transform="translate(-0.35 -0.08)"/>
          <path class="cls-3" d="M69.88,30.52A27.7,27.7,0,0,1,30.81,69.57a27.7,27.7,0,1,0,39.07-39Z" transform="translate(-0.35 -0.08)"/>
        </g>
      </svg>`;
        break;
      case '1x1 Tile':
        svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg);" xml:space="preserve">
      <g>
        <path fill="rgb(${red}, ${green}, ${blue})" d="M97.04,100H2.96C1.33,100,0,98.67,0,97.04V2.96C0,1.33,1.33,0,2.96,0h94.08C98.67,0,100,1.33,100,2.96v94.08
          C100,98.67,98.67,100,97.04,100z"/>
      </g>
      </svg>`;
        break;
      case '1x1 Tile Half Round':
        svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg);" xml:space="preserve">
        <g>
            <path fill="rgb(${red}, ${green}, ${blue})" d="M97.04,100H2.96C1.33,100,0,98.67,0,97.04V50C0,22.39,22.39,0,50,0h0c27.61,0,50,22.39,50,50v47.04
                C100,98.67,98.67,100,97.04,100z"/>
        </g>
        </svg>`;
        break;
      case '1x1 Tile Quarter Round':
        svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg);" xml:space="preserve">
   <g>
       <path class="tile" fill="rgb(${red}, ${green}, ${blue})" d="M97.04,100H2.96C1.33,100,0,98.67,0,97.04V2.96C0,1.33,1.33,0,2.96,0h0C56.55,0,100,43.45,100,97.04v0
           C100,98.67,98.67,100,97.04,100z"/>
   </g>
   </svg>`;
        break;
      case '1x1 Tile Round':
        svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg);" xml:space="preserve">
   <circle  fill="rgb(${red}, ${green}, ${blue})" cx="50" cy="50" r="50"/>
   </svg>
   `;
        break;
      default:
        svg = '';
        break;
    }

    return svg;
  }
}

export default LEGOElement;
