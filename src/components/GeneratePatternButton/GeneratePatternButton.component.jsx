import React from 'react';
import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import Pattern from '../../logic/Pattern';
import { ReactComponent as GeneratePatternIcon } from '../../images/icon-generate-pattern.svg';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';
import { setRandomPatterns } from '../../redux/randomPatterns/randomPatterns.actions';

const GeneratePatternButton = ({ editor, generatorSettings, setPatterns, setRandomPatterns }) => {
  const primary = '#1E95AC';

  let dotColors = generatorSettings;
  let plateColors = generatorSettings['plateColors'];
  let { maxColors, density } = generatorSettings;

  const newPattern = () => {
    const { width, height } = generatorSettings.patternSize;

    let pattern = new Pattern({
      width,
      height,
      dotColors,
      plateColors: plateColors,
      maxColors,
      density: { empty: density },
    });

    return pattern;
  };

  const generatePatterns = () => {
    const { width, height } = generatorSettings.patternRepeatSize;

    if (editor.viewMode === 'random') {
      let randomPatterns = generateRandom(width, height);

      setRandomPatterns(randomPatterns);
    } else {
      const singlePattern = newPattern();

      setPatterns({ single: singlePattern });
    }
  };

  const generateRandom = (width, height) => {
    const randomPatterns = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        randomPatterns.push(newPattern());
      }
    }

    return randomPatterns;
  };

  return (
    <ButtonBubble onClick={generatePatterns}>
      <GeneratePatternIcon stroke={primary} />
    </ButtonBubble>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns, setRandomPatterns })(GeneratePatternButton);
