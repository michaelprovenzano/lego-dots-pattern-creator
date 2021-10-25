import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Pattern from './Pattern.component';
import { connect } from 'react-redux';
import { setApp } from '../../redux/app/app.actions';
import { setViewport } from '../../redux/viewport/viewport.actions';

const Canvas = ({ patterns, setViewport, setApp }) => {
  const ref = useRef(null);

  useEffect(() => {
    const current = ref.current;
    init(current);
  }, []);

  const init = parent => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x464646,
    });
    parent.appendChild(app.view);

    let worldWidth = 1000;
    let worldHeight = 1000;

    // create viewport
    const view = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth,
      worldHeight,

      interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

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

  return (
    <div className='parent'>
      <div ref={ref} style={{ width: window.innerWidth, height: window.innerHeight }}>
        {patterns.single && <Pattern pattern={patterns.single} />}
      </div>
      ;
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setApp, setViewport })(Canvas);
