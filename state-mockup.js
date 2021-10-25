let editor = {
  editMode: 'add',
  viewMode: 'single',
  paintColor: '{legoColor}',
  paintType: 'foreground',
  addShape: '1x1 Tile',
};

let patterns = {
  single: 'pattern',
  multiplePatterns: 'pattern[]',
};

let generatorSettings = {
  patternSize: { width: 6, height: 6 },
  maxColors: 'number',
  density: 'number',
  '1x1Tile': {
    colors: 'legoColors[]',
    density: 'number',
  },
  '1x1TileRound': {
    colors: 'legoColors[]',
    density: 'number',
  },
  '1x1TileHalfRound': {
    colors: 'legoColors[]',
    density: 'number',
  },
  '1x1TileQuarterRound': {
    colors: 'legoColors[]',
    density: 'number',
  },
  plateColors: 'legoColors[]',
};

/*

APP HEIRARCHY

Canvas.jsx
<Canvas>
  <PatternContainer>
    <Pattern pattern={pattern} />
  </PatternContainer>
</Canvas>

Pattern.jsx
<Pattern>
  <Dot />
  <Plate />
</Pattern>

*/
