import React, { Fragment, useEffect, useState, useRef } from 'react';
import Dots from './Dots.component';
import Plate from './Plate.component';
import EditDot from './EditDot.component';
import { connect } from 'react-redux';

const Pattern = ({ pattern, generatorSettings, center }) => {
  const [currentEl, setCurrentEl] = useState(null);
  const isMounted = useRef(false);

  const studSize = generatorSettings.studSize;
  let { width, height } = pattern;

  let plateWidth = width * studSize;
  let plateHeight = height * studSize;

  let topLeft = [center[0] - plateWidth / 2, center[1] - plateHeight / 2];

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, [generatorSettings]);

  return (
    <Fragment>
      {pattern && <Plate pattern={pattern} location={topLeft} setCurrentEl={setCurrentEl} />}
      {pattern && <Dots pattern={pattern} center={center} setCurrentEl={setCurrentEl} />}
      {currentEl && <EditDot currentEl={currentEl} setCurrentEl={setCurrentEl} />}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Pattern);
