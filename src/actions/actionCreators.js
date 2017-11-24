import {SELECT_SHIP, CHANGE_SHIP_ORIENTATION, CHANGE_SELECTED_SQUARE, PLACE_SHIP_ON_BOARD, RELOCATE_SHIP,
  CHANGE_PHASE, OPPONENT_SETUP, CHANGE_SQUARE_TARGET, THROW_BOMB, ADD_TO_COUNTER, OPPONENT_PLAY} from './actionTypes';
import opponentMove from '../helpFunctions/opponentMove';

const selectShip = (id)=> {
  return {
    type: SELECT_SHIP,
    id
  };
};
const changeShipOrientation = ()=> {
  return {
    type: CHANGE_SHIP_ORIENTATION,
  };
};
const changeSelectedSquare = (x, y)=> {
  return {
    type: CHANGE_SELECTED_SQUARE,
    x,
    y
  };
};
const placeShipOnBoard = ()=> {
  return {
    type: PLACE_SHIP_ON_BOARD,
  };
};
const relocateShip = (id)=> {
  return {
    type: RELOCATE_SHIP,
    id
  };
};
const changePhase = (phaseNumber)=> {
  return {
    type: CHANGE_PHASE,
    phaseNumber
  };
};
const opponentSetup = () => {
  return {
    type: OPPONENT_SETUP
  };
};
const changeSquareTarget = (x, y) => {
  return {
    type: CHANGE_SQUARE_TARGET,
    x,
    y
  };
};
const throwBomb = (string, x, y) => {
  return {
    type: THROW_BOMB,
    string,
    x,
    y
  };
};
const addToHitCounter = () => {
  return {
    type: ADD_TO_COUNTER
  };
};
const opponentAboutToPlay = (matrix) => {
  return (dispatch) => {

    opponentMove(matrix, ({string, x, y, message}) => {
      dispatch({
        type: OPPONENT_PLAY,
        string, x, y, message
      })
    })

  }
}
// const opponentPlay = (string, x, y, message) => {
//   return {
//     type: OPPONENT_PLAY,
//     string, x, y, message
//   };
// };
export {selectShip, changeShipOrientation, changeSelectedSquare, placeShipOnBoard, relocateShip,
  changePhase, opponentSetup, changeSquareTarget, throwBomb, addToHitCounter, opponentAboutToPlay};
