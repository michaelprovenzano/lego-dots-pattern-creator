import LEGOElement from './LEGOElement';

class LEGOElement_Empty extends LEGOElement {
  constructor() {
    super();
    this.type = 'Empty';
    this.svg = this.svg.bind(this);
  }

  svg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.99 95.92">
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
  }
}

export default LEGOElement_Empty;
