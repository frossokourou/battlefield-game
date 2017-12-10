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
// matrix, previousHit, hittingMoves come from state (from PlaySquare)
const opponentAboutToPlay = (matrix, previousHit, hittingMoves) => {
  return (dispatch) => {
// three arguments and a callback
    opponentMove(matrix, previousHit, hittingMoves, ({string, x, y, message, positionArray, sinkShip, shipOrientation, newStage}) => {
      dispatch({
        type: OPPONENT_PLAY,
        // callback arguments go to reducer changes
        string, x, y, message, positionArray, sinkShip, shipOrientation, newStage
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
