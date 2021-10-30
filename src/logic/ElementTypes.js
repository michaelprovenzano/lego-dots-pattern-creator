const types = [
  '1x1 Tile',
  '1x1 Tile Quarter Round',
  '1x1 Tile Half Round',
  '1x1 Tile Round',
  'Empty',
];

const elementTypes = {};
for (let type of types) {
  elementTypes[type] = type;
}

export default elementTypes;
