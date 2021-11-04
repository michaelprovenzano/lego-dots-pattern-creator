import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pattern from './Pattern.component';

const Patterns = ({ patterns, randomPatterns, editor, generatorSettings }) => {
  const [singlePattern, setSinglePattern] = useState(null);
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
    setSinglePattern(patterns.single);
    if (patterns.single && editor.viewMode === 'single') handleSingle();
    if (patterns.single && editor.viewMode === 'repeated') handleRepeated();
    if (randomPatterns && editor.viewMode === 'random') handleRepeated();

    // eslint-disable-next-line
  }, [editor.viewMode, patterns, randomPatterns]);

  const handleSingle = () => {
    center = worldCenter;
  };

  const handleRepeated = () => {
    let width, height;
    if (editor.viewMode === 'repeated') {
      width = patterns.single.width;
      height = patterns.single.height;
    }
    if (editor.viewMode === 'random') {
      width = randomPatterns[0].width;
      height = randomPatterns[0].height;
    }

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

  if (!patterns.textures) return null;

  return (
    <Fragment>
      {singlePattern && editor.viewMode === 'single' && (
        <Pattern pattern={singlePattern} center={center} />
      )}
      {singlePattern &&
        editor.viewMode === 'repeated' &&
        repeatedPatterns.map((center, i) => (
          <Pattern pattern={singlePattern} center={center} key={i} />
        ))}
      {randomPatterns && editor.viewMode === 'random' && repeatedPatterns.length > 0
        ? randomPatterns.map((pattern, i) => {
            let selected;
            if (singlePattern) selected = pattern.id === singlePattern.id;
            return (
              <Pattern pattern={pattern} center={repeatedPatterns[i]} selected={selected} key={i} />
            );
          })
        : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Patterns);
