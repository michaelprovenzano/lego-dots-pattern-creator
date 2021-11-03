import React, { useRef, useEffect } from 'react';
import './PatternApp.styles.scss';

import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Patterns from './Patterns.component';
import { connect } from 'react-redux';
import { setApp } from '../../redux/app/app.actions';
import { setViewport } from '../../redux/viewport/viewport.actions';

import { setPatterns } from '../../redux/patterns/patterns.actions';
import legoColors from '../../logic/legoColors';
import LEGOElement from '../../logic/LEGOElement';
import elementTypes from '../../logic/ElementTypes';

const Canvas = ({ generatorSettings, editor, setViewport, setApp, setPatterns }) => {
  const ref = useRef(null);
  let debug = false;

  useEffect(() => {
    const current = ref.current;
    const { view, app } = init(current);

    cacheTextures();

    window.addEventListener('resize', () => onResize(app));

    return () => {
      // Cleanup event listeners
      window.removeEventListener('resize', () => onResize(app));

      // remove the child on rerender
      app.stage.removeChild(view);
      view.destroy();
      app.destroy();
      current.textContent = '';
    };

    // eslint-disable-next-line
  }, [generatorSettings.worldDimensions]);

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

    return { view, app };
  };

  const border = viewport => {
    const line = viewport.addChild(new PIXI.Graphics());
    line.lineStyle(10, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
  };

  const cacheTextures = () => {
    const textures = {};
    const types = Object.keys(elementTypes);

    legoColors.forEach(color => {
      types.forEach(type => {
        const el = new LEGOElement({ type, color });
        textures[`${type} ${color.id}`] = new PIXI.Texture.from(el.svg());
      });
    });

    setPatterns({ textures });
  };

  const onResize = app => {
    if (!app.renderer) return;
    app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  return (
    <div
      className={`parent ${editor.editMode} ${editor.viewMode}`}
      ref={ref}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Patterns />
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setApp, setViewport, setPatterns })(Canvas);
