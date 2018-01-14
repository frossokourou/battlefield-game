import React from 'react';
import PlaySquare from '../containers/PlaySquare';
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
const GameBoard = () => {
  return (
    <div>
      <h3>
        This is the game board
      </h3>
      <div className='table'>
        <div className='rowNumber'></div>
        {
          arrCols.map((letter, index) => (
            // the head letters
            <div className='square colNumber' key={index}>{letter}</div>
          ))
        }
          {
            // builds the board row by row from Squares
            arrRows.map((y, index)=> (
              <div key={index}>
                <div className='rowNumber'>{y + 1}</div>
                {
                  arrRows.map((x)=> (
                    <PlaySquare
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
}
export default GameBoard;
