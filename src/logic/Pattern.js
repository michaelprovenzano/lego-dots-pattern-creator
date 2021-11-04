import LEGOElement from './LEGOElement';
import legoColors from './legoColors';
import { v4 as uuidv4 } from 'uuid';

import { getRandom } from './utils';

function Pattern({ width, height, dotColors, plateColors, maxColors, elementFrequency, density }) {
  if (!elementFrequency) elementFrequency = {};

  const limitedColors = limitMaxColors(dotColors, maxColors);

  function mirroredPattern() {
    // Placeholder until I make this safe for odd numbers
    if (width % 2 > 0 || height % 2 > 0) return repeatedPattern();

    let subPattern = new SubPattern(width / 2, height / 2);
    const rows = [];

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

    return pattern;
  }

  function repeatedPattern() {
    let randomSize = Math.ceil(Math.random() * 2) + 1;

    let subPattern = new SubPattern(randomSize, randomSize, 0.75);
    const pattern = [];

    let [subRow, subCol] = [0, 0];
    for (let row = 0; row < height; row++) {
      pattern[row] = [];
      for (let col = 0; col < width; col++) {
        const el = new LEGOElement(subPattern[subRow][subCol]);
        pattern[row][col] = el.data();
        subCol === subPattern[subRow].length - 1 ? (subCol = 0) : subCol++;
      }
      subRow === subPattern.length - 1 ? (subRow = 0) : subRow++;
    }

    return pattern;
  }

  function SubPattern(width, height, scale = 1) {
    const subPattern = [];

    for (let row = 0; row < height; row++) {
      subPattern.push([]);
      for (let column = 0; column < height; column++) {
        let randomEl = randomElement(limitedColors, {
          LEGO_1x1_Round_Tile: elementFrequency.LEGO_1x1_Round_Tile || 1,
          LEGO_1x1_Half_Round_Tile: elementFrequency.LEGO_1x1_Half_Round_Tile || 1,
          LEGO_1x1_Quarter_Round_Tile: elementFrequency.LEGO_1x1_Quarter_Round_Tile || 1,
          LEGO_1x1_Tile: elementFrequency.LEGO_1x1_Tile || 1,
          Empty_Element: (elementFrequency.Empty_Element || density.empty) * scale,
        });
        subPattern[row][column] = randomEl;
      }
    }

    return subPattern;
  }

  let patternModes = [repeatedPattern, mirroredPattern];
  let random = Math.floor(Math.random() * 2);

  this.dots = patternModes[random]();
  this.plateColor = getRandom(plateColors) || legoColors[0];
  this.width = width;
  this.height = height;
  this.id = uuidv4();

  return this;
}

function flipElements(elementArr, options) {
  const { flipX, flipY } = options;

  let arr = elementArr.map((el, i) => {
    let newEl = new LEGOElement(el);

    if (flipX) newEl.flipX();
    if (flipY) newEl.flipY();

    return newEl.data();
  });

  return arr.reverse();
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

  let randomType = getRandom(possibleElements);

  // get random color from redux state
  let randomColor = legoColors[0];
  if (randomType !== 'Empty')
    randomColor = getRandom(dotColors[randomType.replace(/\s/g, '')]['colors']);

  // Catch cases where no colors are wanted
  if (!randomColor) {
    randomType = 'Empty';
    randomColor = legoColors[0];
  }

  return new LEGOElement({
    type: randomType,
    color: randomColor,
    rotation: Math.ceil(Math.random() * 3) * 90,
  }).data();
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
    randomColorsArr.push(allColorsArr);
    randomColorsMap[randomColor.id] = true;

    if (allColorsArr.length === 0) break; // Break if limit colors is more than total colors
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
