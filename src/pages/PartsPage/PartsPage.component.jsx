import React, { useEffect, useState } from 'react';
import legoColors from '../../logic/legoColors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '../../images/icon-close.svg';
import LEGOElement from '../../logic/LEGOElement';

const PartsPage = ({ patterns }) => {
  const [bom, setBom] = useState(null);

  useEffect(() => {
    if (patterns.single) createBom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patterns]);

  const createBom = () => {
    if (!patterns.single.dots) return;

    // Initial variables
    let dots = patterns.single.dots;
    let bomCount = {};
    let tempBom = [];
    for (let color of legoColors) {
      bomCount[color.id] = {
        color,
      };
    }

    // Loop through pattern elements
    for (let row of dots) {
      for (let el of row) {
        if (el.type === 'Empty') continue;
        let elQuantity = bomCount[el.color.id][el.type];
        elQuantity ? bomCount[el.color.id][el.type]++ : (bomCount[el.color.id][el.type] = 1);
      }
    }

    // Assemble bom
    let allElementColors = Object.keys(bomCount);
    for (let elColor of allElementColors) {
      let elementCounts = Object.keys(bomCount[elColor]);

      for (let el of elementCounts) {
        if (el === 'color') continue;
        tempBom.push({
          type: el,
          color: bomCount[elColor].color,
          count: bomCount[elColor][el],
          element: new LEGOElement({ color: bomCount[elColor].color, type: el }),
        });
      }
    }

    setBom(tempBom);
  };

  return (
    <div className='parts-page'>
      <Link to='/'>
        <CloseIcon />
      </Link>
      <div className='bom'>
        {bom &&
          bom.map((el, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <span>{el.count}</span>
              <span
                dangerouslySetInnerHTML={{ __html: el.element.svg() }}
                style={{
                  display: 'inline-block',
                  width: 30,
                  marginRight: '2rem',
                  marginLeft: '2rem',
                }}
              ></span>
              <span>
                {el.type} - {el.color.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(PartsPage);
