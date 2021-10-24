import LEGOElement from './LEGOElement';

class LEGOElement_1x1 extends LEGOElement {
  constructor(settings) {
    super(settings);
    this.type = '1x1 Tile';
    this.svg = this.svg.bind(this);
  }

  svg() {
    const { red, green, blue } = this.color.rgb;
    let { rotation } = this;

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 100 100" style="enable-background:new 0 0 100 100; width: 100%; transform: rotate(${rotation}deg);" xml:space="preserve">
	<g>
		<path fill="rgb(${red}, ${green}, ${blue})" d="M97.04,100H2.96C1.33,100,0,98.67,0,97.04V2.96C0,1.33,1.33,0,2.96,0h94.08C98.67,0,100,1.33,100,2.96v94.08
			C100,98.67,98.67,100,97.04,100z"/>
	</g>
	</svg>`;
  }
}

export default LEGOElement_1x1;
