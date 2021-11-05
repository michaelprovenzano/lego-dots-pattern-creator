import React, { useEffect, useState } from 'react';
import './PartsPage.styles.scss';
import legoColors from '../../logic/legoColors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '../../images/icon-close.svg';
import InputNumber from '../../components/InputNumber/InputNumber.component';
import Container from '../../containers/Container/Container.component';
import LEGOElement from '../../logic/LEGOElement';

import { setPatterns } from '../../redux/patterns/patterns.actions';

const PartsPage = ({ patterns, setPatterns }) => {
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

  const updateQuantity = e => {
    if (e.target.value < 0) return;
    // setQuantity(e.target.value);
    setPatterns({ quantity: e.target.value });
  };

  return (
    <div className='parts-page'>
      <div className='parts-page-navbar'>
        <InputNumber
          label='Number of Patterns'
          value={patterns.quantity}
          onChange={updateQuantity}
        />
        <Link to='/'>
          <CloseIcon />
        </Link>
      </div>
      <Container className='parts-page__bom'>
        <table style={{ width: '100%' }}>
          <thead>
            <th>Image</th>
            <th>Description</th>
            <th>Color</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {bom &&
              bom.map((el, i) => (
                <tr key={i} style={{ marginBottom: '2rem' }}>
                  <td>
                    <span
                      dangerouslySetInnerHTML={{ __html: el.element.svg() }}
                      style={{
                        display: 'inline-block',
                        width: 30,
                      }}
                    ></span>
                  </td>
                  <td>{el.type}</td>
                  <td>{el.color.name}</td>
                  <td>{el.count * patterns.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { setPatterns })(PartsPage);
