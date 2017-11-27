import {SELECT_SHIP, CHANGE_SHIP_ORIENTATION, CHANGE_SELECTED_SQUARE, PLACE_SHIP_ON_BOARD, RELOCATE_SHIP,
  OPPONENT_SETUP, CHANGE_SQUARE_TARGET, THROW_BOMB, OPPONENT_PLAY, PLAY_AGAIN} from './actionTypes';
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
const playAgain = () => {
  return {
    type: PLAY_AGAIN
  };
};
export {selectShip, changeShipOrientation, changeSelectedSquare, placeShipOnBoard, relocateShip,
   opponentSetup, changeSquareTarget, throwBomb, opponentAboutToPlay, playAgain};
