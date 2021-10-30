import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pattern from './Pattern.component';

const Patterns = ({ patterns, editor, generatorSettings }) => {
  const [repeatedPatterns, setRepeatedPatterns] = useState([]);

  const worldWidth = generatorSettings.worldDimensions.width;
  const worldHeight = generatorSettings.worldDimensions.height;
  const studSize = generatorSettings.studSize;
  let [repeatX, repeatY] = [
    generatorSettings.patternRepeatSize.width,
    generatorSettings.patternRepeatSize.height,
  ];

  const worldCenter = [worldWidth / 2, worldHeight / 2];
  let center = worldCenter;

  useEffect(() => {
    if (patterns.single && editor.viewMode === 'single') handleSingle();
    if (patterns.single && editor.viewMode === 'repeated') handleRepeated();

    // eslint-disable-next-line
  }, [editor.viewMode]);

  const handleSingle = () => {
    center = worldCenter;
  };

  const handleRepeated = () => {
    let { width, height } = patterns.single;
    let [patternWidth, patternHeight] = [width * studSize, height * studSize];
    let patternOffsetX = patternWidth * (repeatX / 2) - patternWidth / 2;
    let patternOffsetY = patternHeight * (repeatY / 2) - patternHeight / 2;
    let allPatterns = [];

    let start = [worldCenter[0] - patternOffsetX, worldCenter[1] - patternOffsetY];
    let center = [...start];

    for (let i = 0; i < repeatX; i++) {
      for (let i = 0; i < repeatY; i++) {
        allPatterns.push(center);
        center = [center[0] + patternWidth, center[1]];
      }
      center = [start[0], center[1] + patternHeight];
    }

    setRepeatedPatterns(allPatterns);
  };

  return (
    <Fragment>
      {patterns.single && editor.viewMode === 'single' && (
        <Pattern pattern={patterns.single} center={center} />
      )}
      {patterns.single &&
        editor.viewMode === 'repeated' &&
        repeatedPatterns.map((center, i) => (
          <Pattern pattern={patterns.single} center={center} key={i} />
        ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Patterns);
