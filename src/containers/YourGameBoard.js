import React from 'react';
import YourSquare from './YourSquare';
import BOARD_DIMENSION from '../actions/data';

let arrRows = [];
let arrCols = [];
for (let i = 0; i < BOARD_DIMENSION; i++) {
  arrRows.push(i);
}
//creates an array of the head letters
for (let i = 0; i < BOARD_DIMENSION; i++){
    arrCols.push(String.fromCharCode(65 + i));
}

const YourGameBoard = () => {
  return (
    <div>
      <h3 className="yourBoardTitle">
        These are your ships in the battlefield
      </h3>
      <div className='smallTable'>
        <div className='rowNumber rowNumberSmaller'>&nbsp;</div>
        {
          arrCols.map((letter, index) => (
            // the head letters
            <div className='square squareSmaller colNumber colNumberSmaller' key={index}>{letter}</div>
          ))
        }
          {
            // builds the board row by row from Squares
            arrRows.map((y, index)=> (
              <div key={index}>
                <div className='rowNumber rowNumberSmaller'>{y + 1}</div>
                {
                  arrRows.map((x)=> (
                    <YourSquare
                      x={x}
                      y={y}
                      key={`${x}${y}`}/>
                  ))
                }
              </div>
            ))
          }
      </div>
    </div>
  );
};
export default YourGameBoard;
