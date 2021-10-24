import elementTypes from './ElementTypes';
import LEGOElement_1x1 from './elements/LEGOElement_1x1';
import LEGOElement_1x1QuarterRound from './elements/LEGOElement_1x1QuarterRound';
import LEGOElement_1x1HalfRound from './elements/LEGOElement_1x1HalfRound';
import LEGOElement_1x1Round from './elements/LEGOElement_1x1Round';
import LEGOElement_Empty from './elements/LEGOElement_Empty';

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
      let newEl = new elementTypes[el.type](el);

      if (flipX) newEl.flipX();
      if (flipY) newEl.flipY();

      return newEl;
    });

    return arr.reverse();
  }

  this.dots = pattern;
  this.plateColor = getRandom(plateColors);

  return this;
}

function randomElement(colorsArr, skewQuantities = {}) {
  const quantities = {
    LEGO_1x1_Round_Tile: {
      quantity: skewQuantities.LEGO_1x1_Round_Tile || 0,
      constructor: LEGOElement_1x1Round,
    },
    LEGO_1x1_Half_Round_Tile: {
      quantity: skewQuantities.LEGO_1x1_Half_Round_Tile || 0,
      constructor: LEGOElement_1x1HalfRound,
    },
    LEGO_1x1_Quarter_Round_Tile: {
      quantity: skewQuantities.LEGO_1x1_Quarter_Round_Tile || 0,
      constructor: LEGOElement_1x1QuarterRound,
    },
    LEGO_1x1_Tile: {
      quantity: skewQuantities.LEGO_1x1_Tile || 0,
      constructor: LEGOElement_1x1,
    },
    Empty_Element: {
      quantity: skewQuantities.Empty_Element || 0,
      constructor: LEGOElement_Empty,
    },
  };
  const possibleElements = [];
  const quantityItems = Object.keys(quantities);
  for (let element of quantityItems) {
    for (let i = 0; i < quantities[element]['quantity']; i++) {
      possibleElements.push(quantities[element]['constructor']);
    }
  }

  const randomEl = getRandom(possibleElements);
  const randomColor = getRandom(colorsArr);
  return new randomEl({ color: randomColor, rotation: Math.ceil(Math.random() * 3) * 90 });
}

export default Pattern;
