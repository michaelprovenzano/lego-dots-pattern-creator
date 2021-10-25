import React from 'react';
import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import Pattern from '../../logic/Pattern';
import { ReactComponent as GeneratePatternIcon } from '../../images/icon-generate-pattern.svg';
import { connect } from 'react-redux';
import { setPatterns } from '../../redux/patterns/patterns.actions';

const GeneratePatternButton = ({ generatorSettings, setPatterns }) => {
  const primary = '#1E95AC';

  const { width, height } = generatorSettings.patternSize;
  let dotColors = generatorSettings['1x1Tile']['colors'];

  const newPattern = () => {
    let pattern = new Pattern({ width, height, dotColors, plateColors: dotColors });
    setPatterns({ single: pattern });
  };

  return (
    <ButtonBubble onClick={newPattern}>
      <GeneratePatternIcon stroke={primary} />
    </ButtonBubble>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns })(GeneratePatternButton);
