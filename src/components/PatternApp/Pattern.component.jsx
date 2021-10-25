import React, { Fragment, useEffect, useState } from 'react';
import Dots from './Dots.component';
import Plate from './Plate.component';
import { connect } from 'react-redux';

const Pattern = ({ viewport, pattern }) => {
  const [patternCenter, setPatternCenter] = useState([0, 0]);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    let { width, height } = pattern;

    const worldWidth = 1000;
    const worldHeight = 1000;
    const worldCenter = [worldWidth / 2, worldHeight / 2];
    setCenter(worldCenter);
    let studSize = 50;
    let plateWidth = width * studSize;
    let plateHeight = height * studSize;
    setPatternCenter([worldCenter[0] - plateWidth / 2, worldCenter[1] - plateHeight / 2]);

    // eslint-disable-next-line
  }, [pattern, viewport]);

  return (
    <Fragment>
      {pattern && <Plate pattern={pattern} location={patternCenter} />}
      {pattern && <Dots pattern={pattern} center={center} />}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Pattern);
