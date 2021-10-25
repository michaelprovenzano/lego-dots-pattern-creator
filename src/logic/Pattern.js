import LEGOElement from './LEGOElement';

import { getRandom } from './utils';

function Pattern({ width, height, dotColors, plateColors, elementFrequency }) {
  const rows = [];
  const subPattern = [];
  if (!elementFrequency) elementFrequency = {};
  for (let row = 0; row < height / 2; row++) {
    subPattern.push([]);
    for (let column = 0; column < width / 2; column++) {
      let randomEl = randomElement(dotColors, {
        LEGO_1x1_Round_Tile: elementFrequency.LEGO_1x1_Round_Tile || 1,
        LEGO_1x1_Half_Round_Tile: elementFrequency.LEGO_1x1_Half_Round_Tile || 1,
        LEGO_1x1_Quarter_Round_Tile: elementFrequency.LEGO_1x1_Quarter_Round_Tile || 1,
        LEGO_1x1_Tile: elementFrequency.LEGO_1x1_Tile || 1,
        Empty_Element: elementFrequency.Empty_Element || 1,
      });
      subPattern[row][column] = randomEl;
    }
  }

  for (let row = 0; row < height / 2; row++) {
    rows[row] = [];
    const flippedElements = flipElements(subPattern[row], { flipX: true });

    rows[row] = [...subPattern[row], ...flippedElements];
  }

  const pattern = [...rows];

  rows.reverse();
  for (let row = 0; row < height / 2; row++) {
    pattern.push(flipElements(rows[row], { flipY: true }).reverse());
  }

  function flipElements(elementArr, options) {
    const { flipX, flipY } = options;

    let arr = elementArr.map((el, i) => {
      let newEl = new LEGOElement(el);

      if (flipX) newEl.flipX();
      if (flipY) newEl.flipY();

      return newEl;
    });

    return arr.reverse();
  }

  this.dots = pattern;
  this.plateColor = getRandom(plateColors);
  this.width = width;
  this.height = height;

  return this;
}

function randomElement(colorsArr, skewQuantities = {}) {
  const quantities = {
    Empty: skewQuantities.Empty_Element || 0,
    '1x1 Tile': skewQuantities.LEGO_1x1_Tile || 0,
    '1x1 Tile Round': skewQuantities.LEGO_1x1_Round_Tile || 0,
    '1x1 Tile Half Round': skewQuantities.LEGO_1x1_Half_Round_Tile || 0,
    '1x1 Tile Quarter Round': skewQuantities.LEGO_1x1_Quarter_Round_Tile || 0,
  };
  const possibleElements = [];

  const quantityItems = Object.keys(quantities);
  for (let i = 0; i < quantityItems.length; i++) {
    possibleElements.push(quantityItems[i]);
  }

  const randomType = getRandom(possibleElements);
  const randomColor = getRandom(colorsArr);
  return new LEGOElement({
    type: randomType,
    color: randomColor,
    rotation: Math.ceil(Math.random() * 3) * 90,
  });
}

export default Pattern;
