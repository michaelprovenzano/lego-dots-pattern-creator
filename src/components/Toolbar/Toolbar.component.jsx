import React, { useState, useEffect } from 'react';
import './Toolbar.styles.scss';
import { connect } from 'react-redux';

import ToolbarGroup from './ToolbarGroup/ToolbarGroup.component';
import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import ActiveColor from './ActiveColor/ActiveColor.component';

import { ReactComponent as AddIcon } from '../../images/icon-add.svg';
import { ReactComponent as AddTileIcon } from '../../images/icon-add-type-tile.svg';
import { ReactComponent as AddTileRoundIcon } from '../../images/icon-add-type-round.svg';
import { ReactComponent as AddTileHalfRoundIcon } from '../../images/icon-add-type-half-round.svg';
import { ReactComponent as AddTileQuarterRoundIcon } from '../../images/icon-add-type-quarter-round.svg';
import { ReactComponent as PaintIcon } from '../../images/icon-paint.svg';
import { ReactComponent as ActivePaintForegroundIcon } from '../../images/icon-active-paint-foreground.svg';
import { ReactComponent as ActivePaintBackgroundIcon } from '../../images/icon-active-paint-background.svg';
import { ReactComponent as ActiveColorIcon } from '../../images/icon-active-color.svg';
import { ReactComponent as RemoveIcon } from '../../images/icon-remove.svg';
import { ReactComponent as RotateIcon } from '../../images/icon-rotate.svg';
import { ReactComponent as EyeDropperIcon } from '../../images/icon-dropper.svg';

import { setSettings } from '../../redux/settings/settings.actions';
import legoColors from '../../logic/legoColors';

const Toolbar = ({ app, settings, setSettings }) => {
  const [activeColor, inactiveColor] = ['white', '#072126'];
  const { editMode, paintType, addShape } = settings;

  const nextShape = () => {
    const shapes = ['1x1 Tile', '1x1 Tile Round', '1x1 Tile Quarter Round', '1x1 Tile Half Round'];
    const curShapeIdx = shapes.indexOf(addShape);
    let index = curShapeIdx + 1;
    if (index === shapes.length) index = 0;
    let nextShape = shapes[index];

    app.setAddShape(nextShape);
    setSettings({ addShape: nextShape });
  };

  return (
    <div className='toolbar'>
      <ToolbarGroup>
        <ButtonBubble
          active={editMode === 'add'}
          onClick={e => {
            app.setEditMode('add');
            setSettings({ editMode: 'add' });
          }}
        >
          <AddIcon fill={editMode === 'add' ? activeColor : inactiveColor} />
        </ButtonBubble>
        <ButtonBubble onClick={nextShape}>
          {addShape === '1x1 Tile' && <AddTileIcon />}
          {addShape === '1x1 Tile Round' && <AddTileRoundIcon />}
          {addShape === '1x1 Tile Quarter Round' && <AddTileQuarterRoundIcon />}
          {addShape === '1x1 Tile Half Round' && <AddTileHalfRoundIcon />}
        </ButtonBubble>
      </ToolbarGroup>
      <ToolbarGroup>
        <ButtonBubble
          active={editMode === 'paint'}
          onClick={e => {
            app.setEditMode('paint');
            setSettings({ editMode: 'paint' });
          }}
        >
          <PaintIcon fill={editMode === 'paint' ? activeColor : inactiveColor} />
        </ButtonBubble>
        {paintType === 'background' ? (
          <ButtonBubble
            onClick={e => {
              setSettings({ paintType: 'foreground' });
              app.setPaintType('foreground');
            }}
          >
            <ActivePaintBackgroundIcon />
          </ButtonBubble>
        ) : (
          <ButtonBubble
            onClick={e => {
              setSettings({ paintType: 'background' });
              app.setPaintType('background');
            }}
          >
            <ActivePaintForegroundIcon />
          </ButtonBubble>
        )}

        <ButtonBubble
          active={editMode === 'dropper'}
          onClick={e => {
            app.setEditMode('dropper');
            setSettings({ editMode: 'dropper' });
          }}
        >
          <EyeDropperIcon fill={editMode === 'dropper' ? activeColor : inactiveColor} />
        </ButtonBubble>
        <ActiveColor activeColor={settings.paintColor} setSettings={setSettings} app={app} />
        {/* <ButtonBubble onClick={e => setSettings({ paintColor: legoColors[3] })}>
          <ActiveColorIcon
            fill={`rgb(${settings.paintColor.rgb.red}, ${settings.paintColor.rgb.green}, ${settings.paintColor.rgb.blue})`}
          />
        </ButtonBubble> */}
      </ToolbarGroup>
      <ToolbarGroup>
        <ButtonBubble
          active={editMode === 'delete'}
          onClick={e => {
            app.setEditMode('delete');
            setSettings({ editMode: 'delete' });
          }}
        >
          <RemoveIcon fill={editMode === 'delete' ? activeColor : inactiveColor} />
        </ButtonBubble>
        <ButtonBubble
          active={editMode === 'rotate'}
          onClick={e => {
            app.setEditMode('rotate');
            setSettings({ editMode: 'rotate' });
          }}
        >
          <RotateIcon fill={editMode === 'rotate' ? activeColor : inactiveColor} />
        </ButtonBubble>
      </ToolbarGroup>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setSettings })(Toolbar);
