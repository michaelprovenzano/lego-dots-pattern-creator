import LEGOElement_1x1 from './elements/LEGOElement_1x1';
import LEGOElement_1x1QuarterRound from './elements/LEGOElement_1x1QuarterRound';
import LEGOElement_1x1HalfRound from './elements/LEGOElement_1x1HalfRound';
import LEGOElement_1x1Round from './elements/LEGOElement_1x1Round';
import LEGOElement_Empty from './elements/LEGOElement_Empty';

const elementTypes = {
  '1x1 Tile': LEGOElement_1x1,
  '1x1 Tile Quarter Round': LEGOElement_1x1QuarterRound,
  '1x1 Tile Half Round': LEGOElement_1x1HalfRound,
  '1x1 Tile Round': LEGOElement_1x1Round,
  Empty: LEGOElement_Empty,
};

export default elementTypes;
