import React from 'react';
import {connect} from 'react-redux';
import {changeSelectedSquare, placeShipOnBoard, relocateShip} from '../actions/actionCreators';
import BOARD_DIMENSION from '../actions/data';
import '../css/board.css';

// Squares make the board
let Square = (props)=> {
// hoverSquare shows the possible position of the ship according to size
  const hoverSquare = (e) => {
    if (props.selectedShipIndex > -1) {
    // array distructuring
    let [x, y] = e.target.id.split('-');
    if (x) {
      // where the cursor actually is (info from the mouseOver event)
      x = parseInt(x, 10);
      y = parseInt(y, 10);
    }
// if there is a ship selected
      const size = props.ships[props.selectedShipIndex].size;
      // diff: to teleytaio index gia na xwraei to ship sti grammi -> ola - size
      const diff = BOARD_DIMENSION - size;
      if (props.ships[props.selectedShipIndex].isHorizontal) {
        // check if the ship does not fit in the line
        if (x + size > BOARD_DIMENSION) {
          x = diff;
        }
      } else {
        if (y + size > BOARD_DIMENSION) {
          y = diff;
        }
      }
      // changes the selected square - the first square for the ship to fit the line
      props.changeSelectedSquare(x, y);
    }
  }
// clickOnBoard chooses the ships position - this is the first square of the ship
  const clickOnBoard = (e) => {
    // if there is a ship and you need to relocate it
    let [x, y] = e.target.id.split('-');
    // value is the ship id that is written in the matrix
    let value = props.matrix[parseInt(y, 10)][parseInt(x, 10)];
    if (value !== null) {
      return props.relocateShip(value);
    }
    if (props.selectedShipIndex > -1) {
      // check if there is a square that is already occupied by another ship
      const x = props.selectedSquare.x;
      const y = props.selectedSquare.y;
      const size = props.ships[props.selectedShipIndex].size;
      if (props.ships[props.selectedShipIndex].isHorizontal) {
        for (let i = x; i < x + size; i++) {
          if (props.matrix[y][i] !== null) {
            return;
          }
        }
      } else {
        for (let i = y; i < y + size; i++) {
          if (props.matrix[i][x] !== null) {
            return;
          }
        }
      }
      // places the ship on the selected square according to its orientation -> matrix cell value = shipIndex
      props.placeShipOnBoard();
//      props.deselectShipIndex();
    }
  }
  // changes the color of the square on the ship hover
  let styleForShip = 'square';
  if (props.selectedShipIndex > -1) {
    // props.x starts from 0
    if (props.matrix[props.y][props.x] != null) {
      styleForShip += ' squareShip';
    } else {
      // if the ship is horizontal
      if (props.ships[props.selectedShipIndex].isHorizontal) {
        // totalX: index of the ship's last square
        const totalX = props.selectedSquare.x + props.ships[props.selectedShipIndex].size;
        if (props.y === props.selectedSquare.y
          // on the same line add style from the selected square to the last square of the ship
          && props.x >= props.selectedSquare.x && props.x < totalX) {
          styleForShip += ' squareHover';
        }
      } else {
      // if the ship is vertical
        const totalY = props.selectedSquare.y + props.ships[props.selectedShipIndex].size;
        if (props.x === props.selectedSquare.x
          && props.y >= props.selectedSquare.y && props.y < totalY) {
          styleForShip += ' squareHover';
        }
      }
    }
  }
  return (
    <div id={`${props.x}-${props.y}`}
      onMouseOver={hoverSquare}
      onClick={clickOnBoard}
      className={styleForShip}>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ships: state.ships,
    selectedShipIndex: state.selectedShipIndex,
    selectedSquare: state.selectedSquare,
    matrix: state.matrix
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeSelectedSquare: (x, y) => {
      dispatch(changeSelectedSquare(x, y))
    },
    placeShipOnBoard: (x, y) => {
      dispatch(placeShipOnBoard(x, y))
    },
    relocateShip: (id) => {
      dispatch(relocateShip(id))
    },
  }
};
Square = connect(mapStateToProps, mapDispatchToProps)(Square);
export default Square;
