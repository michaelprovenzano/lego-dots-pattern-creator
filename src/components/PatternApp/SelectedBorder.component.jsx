import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

const SelectedBorder = ({ viewport, width, height, topLeft }) => {
  useEffect(() => {
    const border = viewport.addChild(new PIXI.Graphics());
    border.lineStyle(6, 0xff0000).drawRect(topLeft[0], topLeft[1], width, height);

    return () => {
      viewport.removeChild(border);
      border.destroy();
    };
  });

  return null;
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(SelectedBorder);
