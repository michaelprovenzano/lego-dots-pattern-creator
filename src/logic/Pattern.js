import LEGOElement from './LEGOElement';
import legoColors from './legoColors';

import { getRandom } from './utils';

function Pattern({ width, height, dotColors, plateColors, maxColors, elementFrequency, density }) {
  const rows = [];
  const subPattern = [];
  if (!elementFrequency) elementFrequency = {};

  const limitedColors = limitMaxColors(dotColors, maxColors);

  for (let row = 0; row < height / 2; row++) {
    subPattern.push([]);
    for (let column = 0; column < width / 2; column++) {
      let randomEl = randomElement(limitedColors, {
        LEGO_1x1_Round_Tile: elementFrequency.LEGO_1x1_Round_Tile || 1,
        LEGO_1x1_Half_Round_Tile: elementFrequency.LEGO_1x1_Half_Round_Tile || 1,
        LEGO_1x1_Quarter_Round_Tile: elementFrequency.LEGO_1x1_Quarter_Round_Tile || 1,
        LEGO_1x1_Tile: elementFrequency.LEGO_1x1_Tile || 1,
        Empty_Element: elementFrequency.Empty_Element || density.empty,
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

function randomElement(dotColors, skewQuantities = {}) {
  const quantities = {
    Empty: skewQuantities.Empty_Element || 0,
    '1x1 Tile': skewQuantities.LEGO_1x1_Tile || 0,
    '1x1 Tile Round': skewQuantities.LEGO_1x1_Round_Tile || 0,
    '1x1 Tile Half Round': skewQuantities.LEGO_1x1_Half_Round_Tile || 0,
    '1x1 Tile Quarter Round': skewQuantities.LEGO_1x1_Quarter_Round_Tile || 0,
  };
  const possibleElements = [];

  // push possible patterns for quantities.
  // TODO: change the nested loop to a more performant solution
  const quantityItems = Object.keys(quantities);
  for (let i = 0; i < quantityItems.length; i++) {
    for (let j = 0; j < quantities[quantityItems[i]]; j++) {
      possibleElements.push(quantityItems[i]);
    }
  }

  const randomType = getRandom(possibleElements);

  // get random color from redux state
  let randomColor = legoColors[0];
  if (randomType !== 'Empty')
    randomColor = getRandom(dotColors[randomType.replace(/\s/g, '')]['colors']);

  return new LEGOElement({
    type: randomType,
    color: randomColor,
    rotation: Math.ceil(Math.random() * 3) * 90,
  });
}

function limitMaxColors(dotColors, maxColors) {
  let allColors = {};
  let tileColors = dotColors['1x1Tile']['colors'];
  let roundColors = dotColors['1x1TileRound']['colors'];
  let halfRoundColors = dotColors['1x1TileHalfRound']['colors'];
  let quarterRoundColors = dotColors['1x1TileQuarterRound']['colors'];

  tileColors.forEach(color => (allColors[color.id] = color));
  roundColors.forEach(color => (allColors[color.id] = color));
  halfRoundColors.forEach(color => (allColors[color.id] = color));
  quarterRoundColors.forEach(color => (allColors[color.id] = color));

  let allColorsArr = Object.values(allColors);

  let randomColorsArr = [];
  let randomColorsMap = {};

  for (let i = 0; i < maxColors; i++) {
    let randomIndex = Math.floor(Math.random() * allColorsArr.length);
    let randomColor = allColorsArr[randomIndex];
    allColorsArr.splice(randomIndex, 1);
    randomColorsArr.push(randomColor);
    randomColorsMap[randomColor.id] = true;
  }

  let limitedColors = {
    '1x1Tile': {
      colors: tileColors.filter(el => randomColorsMap[el.id]),
    },
    '1x1TileRound': {
      colors: roundColors.filter(el => randomColorsMap[el.id]),
    },
    '1x1TileHalfRound': {
      colors: halfRoundColors.filter(el => randomColorsMap[el.id]),
    },
    '1x1TileQuarterRound': {
      colors: quarterRoundColors.filter(el => randomColorsMap[el.id]),
    },
  };

  return limitedColors;
}

export default Pattern;
