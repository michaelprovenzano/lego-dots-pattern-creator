import React, { useState, useEffect } from 'react';
import './Tray.styles.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import GeneratePatternButton from '../GeneratePatternButton/GeneratePatternButton.component';
import Loader from 'react-loader-spinner';

import { ReactComponent as PartsListIcon } from '../../images/icon-parts-list.svg';
import { ReactComponent as SettingsIcon } from '../../images/icon-settings.svg';
import { ReactComponent as JPGIcon } from '../../images/icon-jpg.svg';
import { ReactComponent as DownloadIcon } from '../../images/icon-download.svg';
import { ReactComponent as PatternSettingsIcon } from '../../images/icon-pattern-settings.svg';
import { ReactComponent as MultiplePatternsIcon } from '../../images/icon-multiple-patterns.svg';
import { ReactComponent as RandomPatternsIcon } from '../../images/icon-random-patterns.svg';
import { ReactComponent as SinglePatternIcon } from '../../images/icon-single-pattern.svg';
import { ReactComponent as SeparatorIcon } from '../../images/icon-separator.svg';

import { setEditor } from '../../redux/editor/editor.actions';
import { setGeneratorSettings } from '../../redux/generatorSettings/generatorSettings.actions';

const Tray = ({
  app,
  editor,
  viewport,
  patterns,
  generatorSettings,
  setGeneratorSettings,
  setEditor,
}) => {
  const black = '#072126';
  const primary = '#1E95AC';
  const viewMode = editor.viewMode;
  const [downloading, setDownloading] = useState(false);
  const [startDimensions, setStartDimensions] = useState({});
  const [crop, setCrop] = useState({ width: null, height: null });

  let patternWidth = generatorSettings.patternSize.width * generatorSettings.studSize;
  let patternHeight = generatorSettings.patternSize.height * generatorSettings.studSize;

  let worldDimensions = generatorSettings.worldDimensions;

  useEffect(() => {
    if (!viewport) return;
    if (viewMode === 'single') {
      if (viewport.worldWidth === crop.width && viewport.worldHeight === crop.height && downloading)
        download();
    } else {
      if (downloading) download();
    }
  });

  const cropViewport = e => {
    if (viewMode === 'single') {
      setCrop({ width: patternWidth, height: patternHeight });
      setStartDimensions({ ...worldDimensions });
      setGeneratorSettings({ worldDimensions: { width: patternWidth, height: patternWidth } });
    }
  };

  const extractImage = e => {
    cropViewport();
    setDownloading(true);
  };

  const download = e => {
    app.renderer.plugins.extract.canvas(viewport).toBlob(b => {
      const a = document.createElement('a');
      document.body.append(a);
      a.download = 'screenshot';
      a.href = URL.createObjectURL(b);
      a.click();
      a.remove();
      setDownloading(false);
      setCrop({ width: null, height: null });
      if (viewMode === 'single') setGeneratorSettings({ worldDimensions: startDimensions }); // only set world dimensions on single render
    }, 'image/jpeg');
  };

  return (
    <div className='tray'>
      <ButtonBubble className='inactive'>
        <SettingsIcon stroke={black} />
      </ButtonBubble>
      <div className='tray__middle'>
        <ButtonBubble className='inactive'>
          <PartsListIcon stroke={black} />
        </ButtonBubble>
        <SeparatorIcon className='separator' />
        <ButtonBubble onClick={extractImage}>
          {downloading ? (
            <Loader type='TailSpin' color={primary} height={26} width={26} />
          ) : (
            <DownloadIcon stroke={black} />
          )}
        </ButtonBubble>
        <ButtonBubble className='inactive'>
          <JPGIcon stroke={black} />
        </ButtonBubble>
        <SeparatorIcon className='separator' />
        <Link to='/pattern-settings/home'>
          <ButtonBubble>
            <PatternSettingsIcon stroke={black} />
          </ButtonBubble>
        </Link>
        <ButtonBubble
          active={viewMode === 'single'}
          onClick={e => setEditor({ viewMode: 'single' })}
        >
          <SinglePatternIcon stroke={viewMode === 'single' ? 'white' : black} />
        </ButtonBubble>
        <ButtonBubble
          active={viewMode === 'repeated'}
          onClick={e => setEditor({ viewMode: 'repeated' })}
        >
          <MultiplePatternsIcon stroke={viewMode === 'repeated' ? 'white' : black} />
        </ButtonBubble>
        <ButtonBubble
          active={viewMode === 'random'}
          onClick={e => setEditor({ viewMode: 'random' })}
        >
          <RandomPatternsIcon stroke={viewMode === 'random' ? 'white' : black} />
        </ButtonBubble>
      </div>
      <GeneratePatternButton />
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setEditor, setGeneratorSettings })(Tray);
