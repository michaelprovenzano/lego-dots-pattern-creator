import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import PixiApp from '../../logic/PixiApp';

const Canvas = () => {
  const ref = useRef(null);
  const [app, setApp] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    const current = ref.current;
    const app = init(current);

    return () => current.removeChild(app.view);
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
    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth,
      worldHeight,

      interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // add the viewport to the stage
    app.stage.addChild(viewport);

    // activate plugins
    viewport
      .drag({ keyToPress: ['Space'] })
      .pinch()
      .wheel()
      .decelerate();
    viewport.moveCenter(worldWidth / 2, worldHeight / 2);

    // generate pattern
    const pixiApp = new PixiApp(viewport, {
      app,
      afterDropper: el => setActiveColor(el.getColor()),
    });
    pixiApp.newPattern();
    setApp(pixiApp);

    return { view: app.view, viewport, pixiApp };
  };

  return (
    <div className='parent'>
      <div ref={ref} style={{ width: window.innerWidth, height: window.innerHeight }}></div>;
    </div>
  );
};

export default Canvas;
