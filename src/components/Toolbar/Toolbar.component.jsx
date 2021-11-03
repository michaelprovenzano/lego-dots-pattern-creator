import React, { Fragment } from 'react';
import './Toolbar.styles.scss';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';

import ToolbarGroup from './ToolbarGroup/ToolbarGroup.component';
import ButtonBubble from '../Button_Bubble/Button_Bubble.component';
import ActiveColor from './ActiveColor/ActiveColor.component';

import { ReactComponent as PointerIcon } from '../../images/icon-pointer.svg';
import { ReactComponent as AddIcon } from '../../images/icon-add.svg';
import { ReactComponent as AddTileIcon } from '../../images/icon-add-type-tile.svg';
import { ReactComponent as AddTileRoundIcon } from '../../images/icon-add-type-round.svg';
import { ReactComponent as AddTileHalfRoundIcon } from '../../images/icon-add-type-half-round.svg';
import { ReactComponent as AddTileQuarterRoundIcon } from '../../images/icon-add-type-quarter-round.svg';
import { ReactComponent as PaintIcon } from '../../images/icon-paint.svg';
import { ReactComponent as ActivePaintForegroundIcon } from '../../images/icon-active-paint-foreground.svg';
import { ReactComponent as ActivePaintBackgroundIcon } from '../../images/icon-active-paint-background.svg';
import { ReactComponent as RemoveIcon } from '../../images/icon-remove.svg';
import { ReactComponent as RotateIcon } from '../../images/icon-rotate.svg';
import { ReactComponent as EyeDropperIcon } from '../../images/icon-dropper.svg';

import { setEditor } from '../../redux/editor/editor.actions';

const Toolbar = ({ editor, setEditor }) => {
  const [activeColor, inactiveColor] = ['white', '#072126'];
  const { editMode, paintType, addShape } = editor;

  const nextShape = () => {
    const shapes = ['1x1 Tile', '1x1 Tile Round', '1x1 Tile Quarter Round', '1x1 Tile Half Round'];
    const curShapeIdx = shapes.indexOf(addShape);
    let index = curShapeIdx + 1;
    if (index === shapes.length) index = 0;
    let nextShape = shapes[index];

    setEditor({ addShape: nextShape });
  };

  return (
    <div className='toolbar'>
      {editor.viewMode === 'random' ? (
        <ToolbarGroup>
          <ButtonBubble active={true} tip='Select' id='select' tipPlace='left'>
            <PointerIcon fill={activeColor} style={{ marginLeft: '3px' }} />
          </ButtonBubble>{' '}
        </ToolbarGroup>
      ) : (
        <Fragment>
          <ToolbarGroup>
            <ButtonBubble
              active={editMode === 'add'}
              onClick={e => setEditor({ editMode: 'add' })}
              tip='Add (A)'
              id='add'
              tipPlace='left'
            >
              <AddIcon fill={editMode === 'add' ? activeColor : inactiveColor} />
            </ButtonBubble>
            <ButtonBubble
              onClick={nextShape}
              tip='Dot Shape (1, 2, 3, 4)'
              id='shape'
              tipPlace='left'
            >
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
                setEditor({ editMode: 'paint' });
              }}
              tip='Paint (C)'
              id='paint'
              tipPlace='left'
            >
              <PaintIcon fill={editMode === 'paint' ? activeColor : inactiveColor} />
            </ButtonBubble>
            {paintType === 'background' ? (
              <ButtonBubble
                onClick={e => setEditor({ paintType: 'foreground' })}
                tip='Foreground/Background (X)'
                id='foreground'
                tipPlace='left'
              >
                <ActivePaintBackgroundIcon />
              </ButtonBubble>
            ) : (
              <ButtonBubble
                onClick={e => setEditor({ paintType: 'background' })}
                tip='Foreground/Background (X)'
                id='foreground'
                tipPlace='left'
              >
                <ActivePaintForegroundIcon />
              </ButtonBubble>
            )}

            <ButtonBubble
              active={editMode === 'dropper'}
              onClick={e => {
                setEditor({ editMode: 'dropper' });
              }}
              tip='Eye Dropper (F or I)'
              id='dropper'
              tipPlace='left'
            >
              <EyeDropperIcon fill={editMode === 'dropper' ? activeColor : inactiveColor} />
            </ButtonBubble>
            <ActiveColor activeColor={editor.paintColor} setEditor={setEditor} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ButtonBubble
              active={editMode === 'delete'}
              onClick={e => {
                setEditor({ editMode: 'delete' });
              }}
              tip='Delete (D)'
              id='delete'
              tipPlace='left'
            >
              <RemoveIcon fill={editMode === 'delete' ? activeColor : inactiveColor} />
            </ButtonBubble>
            <ButtonBubble
              active={editMode === 'rotate'}
              onClick={e => {
                setEditor({ editMode: 'rotate' });
              }}
              tip='Rotate (R)'
              id='rotate'
              tipPlace='left'
            >
              <RotateIcon fill={editMode === 'rotate' ? activeColor : inactiveColor} />
            </ButtonBubble>
          </ToolbarGroup>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setEditor })(Toolbar);
