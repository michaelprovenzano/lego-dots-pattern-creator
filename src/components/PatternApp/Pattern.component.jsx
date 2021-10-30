import React, { Fragment } from 'react';
import Dots from './Dots.component';
import Plate from './Plate.component';
import { connect } from 'react-redux';

const Pattern = ({ pattern, generatorSettings, center }) => {
  const studSize = generatorSettings.studSize;
  let { width, height } = pattern;

  let plateWidth = width * studSize;
  let plateHeight = height * studSize;

  let topLeft = [center[0] - plateWidth / 2, center[1] - plateHeight / 2];

  return (
    <Fragment>
      {pattern && <Plate pattern={pattern} location={topLeft} />}
      {pattern && <Dots pattern={pattern} center={center} />}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Pattern);
