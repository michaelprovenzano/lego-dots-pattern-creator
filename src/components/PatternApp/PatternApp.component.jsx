import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Patterns from './Patterns.component';
import { connect } from 'react-redux';
import { setApp } from '../../redux/app/app.actions';
import { setViewport } from '../../redux/viewport/viewport.actions';

const Canvas = ({ generatorSettings, setViewport, setApp }) => {
  const ref = useRef(null);
  let debug = true;

  useEffect(() => {
    const current = ref.current;
    init(current);

    return () => {
      // remove the child on rerend
      current.textContent = '';
    };

    // eslint-disable-next-line
  }, []);

  const init = parent => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x464646,
    });
    parent.appendChild(app.view);

    let worldWidth = generatorSettings.worldDimensions.width;
    let worldHeight = generatorSettings.worldDimensions.height;

    // create viewport
    const view = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth,
      worldHeight,

      interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    if (debug) border(view);

    // add the view to the stage
    app.stage.addChild(view);

    // activate plugins
    view
      .drag({ keyToPress: ['AltLeft', 'AltRight'] })
      .pinch()
      .wheel()
      .decelerate();
    view.moveCenter(worldWidth / 2, worldHeight / 2);

    // generate pattern
    setViewport(view);
    setApp(app);
  };

  function border(viewport) {
    const line = viewport.addChild(new PIXI.Graphics());
    line.lineStyle(10, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
  }

  return (
    <div className='parent'>
      <div ref={ref} style={{ width: window.innerWidth, height: window.innerHeight }}>
        <Patterns />
      </div>
      ;
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setApp, setViewport })(Canvas);
