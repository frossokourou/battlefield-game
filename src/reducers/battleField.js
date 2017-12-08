import {SELECT_SHIP, CHANGE_SHIP_ORIENTATION, CHANGE_SELECTED_SQUARE, PLACE_SHIP_ON_BOARD, RELOCATE_SHIP,
  OPPONENT_SETUP, CHANGE_SQUARE_TARGET, THROW_BOMB, OPPONENT_PLAY, PLAY_AGAIN} from '../actions/actionTypes';
import BOARD_DIMENSION from '../actions/data';
import setupMatrixOpponent from '../helpFunctions/setupMatrixOpponent';
// import checkShips from '../helpFunctions/checkShips';

export const initialState = { ships:
  [
    {id: 0, isHorizontal: true, size: 2, isPlaced: false, xFirst: null, yFirst: null},
    {id: 1, isHorizontal: true, size: 1, isPlaced: false, xFirst: null, yFirst: null},
    {id: 2, isHorizontal: true, size: 4, isPlaced: false, xFirst: null, yFirst: null},
    {id: 3, isHorizontal: true, size: 3, isPlaced: false, xFirst: null, yFirst: null},
    {id: 4, isHorizontal: true, size: 1, isPlaced: false, xFirst: null, yFirst: null},
    {id: 5, isHorizontal: true, size: 2, isPlaced: false, xFirst: null, yFirst: null},
    {id: 6, isHorizontal: true, size: 5, isPlaced: false, xFirst: null, yFirst: null}
  ],
  selectedShipIndex: -1,
  selectedSquare: {x: 0, y: 0},
  matrix: new Array(BOARD_DIMENSION).fill(new Array(BOARD_DIMENSION).fill(null)),
  shipsOpponent: [
    {id: 0, isHorizontal: true, size: 2, isPlaced: false, xFirst: null, yFirst: null},
    {id: 1, isHorizontal: true, size: 1, isPlaced: false, xFirst: null, yFirst: null},
    {id: 2, isHorizontal: true, size: 4, isPlaced: false, xFirst: null, yFirst: null},
    {id: 3, isHorizontal: true, size: 3, isPlaced: false, xFirst: null, yFirst: null},
    {id: 4, isHorizontal: true, size: 1, isPlaced: false, xFirst: null, yFirst: null},
    {id: 5, isHorizontal: true, size: 2, isPlaced: false, xFirst: null, yFirst: null},
    {id: 6, isHorizontal: true, size: 5, isPlaced: false, xFirst: null, yFirst: null}
  ],
  matrixOpponent: new Array(BOARD_DIMENSION).fill(new Array(BOARD_DIMENSION).fill(null)),
  // during setup: -1,
  // before first hit gamePhase: 0,
  // game is played gamePhase: 1,
  // you win: gamePhase: 2,
  // Computer wins: gamePhase: 3
  gamePhase: -1,
  opponentTurn: '',
  previousHit: {isItX: '', prevX: -1, prevY: -1},
  hittingMoves: {
    stage: 0,
    positionArray: [],
    sinkShip: [],
    shipOrientation: -1
  },
  isYourTurn: true,
  didYouMiss: true,
  totalShipSquares: 0,
  squaresHit: 0,
  squaresHitOpponent: 0,
  squareInTarget: {x: -1, y: -1},
  chatList: []
  // array of objects -> {player: , text: }
};
// changeMatrix places ship's id on matrix and removes it to relocate ship
const changeMatrix = (state, x, y, id, value) => {
  if (state.selectedShipIndex > -1) {
    const size  = state.ships[id].size;
    if (state.ships[id].isHorizontal) {
      return [
        // return the matrix until the array that needs to be changed
        ...state.matrix.slice(0, y),
        // in the array matrix[y - 1] change the Xs according to ship size
        state.matrix[y].map((cell, index) => {
          if (index >= x && index < x + size) {
            // returns the id of the ship -> the index in the ships array
            return value;
          } else {
            return cell;
          }
        }),
        //return the rest of the matrix
        ...state.matrix.slice(y + 1)
      ]
    } else {
      console.log('Ship is vertical');
      return [
        ...state.matrix.slice(0, y),
        ...state.matrix.slice(y, y + size).map((row) => (
            [...row.slice(0, x),
             value,
             ...row.slice(x + 1)
            ]
        )),
        ...state.matrix.slice(y + size)
      ]
    }
  }
};
const bombMatrix = (matrix, string, x, y) => {
  console.log('kati');
  return [
    ...matrix.slice(0, y),
    matrix[y].map((cell, index) => {
      if (index === x) {
        return string;
      } else {
        return cell;
      }
    }),
    ...matrix.slice(y + 1)
  ];
};
// to break den xreiazetai -> unreachable code logw return
const battleField = (state=initialState, action={}) => {
  switch (action.type) {
    case SELECT_SHIP:
      return {
        ...state,
        selectedShipIndex: action.id
      }
    case CHANGE_SHIP_ORIENTATION:
      return {
        ...state,
        ships: state.ships.map((ship)=> {
            if (state.selectedShipIndex === ship.id) {
              return {...ship, isHorizontal: !ship.isHorizontal};
            } else {
              return ship;
            }
          })
        };
    case CHANGE_SELECTED_SQUARE:
      // if the ship is already placed, don't do anything
      if (state.selectedShipIndex > -1 && !state.ships[state.selectedShipIndex].isPlaced) {
        return {
          ...state,
          selectedSquare: {x: action.x, y: action.y},
        };
      }
      return state;
    case PLACE_SHIP_ON_BOARD:
      if (state.selectedShipIndex > -1) {
        const selectedShipIndex = state.selectedShipIndex;
        const x = state.selectedSquare.x;
        const y = state.selectedSquare.y;
        return {
          ...state,
          matrix: changeMatrix(state, x, y, selectedShipIndex, selectedShipIndex),
          ships: [
            ...state.ships.slice(0, selectedShipIndex),
            // change only the ship that has been placed on board
            {...state.ships[selectedShipIndex],
              isPlaced: true,
              xFirst: x,
              yFirst: y
            },
            ...state.ships.slice(selectedShipIndex + 1)
          ]
        }
      }
      break;
    case RELOCATE_SHIP:
      const x = state.ships[action.id].xFirst;
      const y = state.ships[action.id].yFirst;

      return {
        ...state,
        selectedShipIndex: action.id,
        // remove the ship's id from the matrix
        matrix: changeMatrix(state, x, y, action.id, null),
        // change the ship that has been removed
        ships: [
          ...state.ships.slice(0, action.id),
          {
            ...state.ships[action.id],
            isPlaced: false,
            xFirst: initialState.ships[action.id].xFirst,
            yFirst: initialState.ships[action.id].yFirst
          },
          ...state.ships.slice(action.id + 1)
        ]
      }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Link: play_game
      //insert the matrix of the opponent
    case OPPONENT_SETUP:
      return {
        ...state,
        // returns an object (object destructuring)
        ...setupMatrixOpponent(state.ships),
        gamePhase: 0
        // matrixOpponent: setupMatrixOpponent(state.ships).matrixOpponent,
        // shipsOpponent: setupMatrixOpponent(state.ships).shipsOpponent,
        // totalShipSquares: setupMatrixOpponent(state.ships).totalShipSquares
      }
    case CHANGE_SQUARE_TARGET:
      return {
        ...state,
        squareInTarget: {x: action.x, y: action.y},
        isYourTurn: true,
      }
    case THROW_BOMB:
    // you play
      let missed = true;
      let addHit = 0;
      // when gamePhase is 1, the game is played
      let winGame = 1;
      if (action.string === 'X') {
        missed = false;
        addHit = 1;
        if (state.totalShipSquares - 1 === state.squaresHit) {
          // when gamePhase is 2, you are the winner
          winGame = 2;
        }
      }
      return {
        ...state,
        matrixOpponent: bombMatrix(state.matrixOpponent, action.string, action.x, action.y),
        squareInTarget: {x: action.x, y: action.y},
        // when you play, the opponent's message is erased
        opponentTurn: initialState.opponentTurn,
        isYourTurn: false,
        didYouMiss: missed,
        gamePhase: winGame,
        squaresHit: state.squaresHit + addHit
      }
    case OPPONENT_PLAY:
      let addOne = 0;
      let winOne = 1;
      if (action.string === 'X') {
        addOne = 1;
        if (state.totalShipSquares - 1 === state.squaresHitOpponent) {
          winOne = 3;
        }
      }
      if (state.isYourTurn || state.gamePhase !== 1) {
        return state;
      } else {
        return {
          ...state,
          matrix: bombMatrix(state.matrix, action.string, action.x, action.y),
          opponentTurn: action.message,
          isYourTurn: true,
          squaresHitOpponent: state.squaresHitOpponent + addOne,
          // when gamePhase is 3, computer wins
          gamePhase: winOne,
          previousHit: {isItX: action.string, prevX: action.x, prevY: action.y},
          hittingMoves: {
            ...state.hittingMoves,
            positionArray: action.positionArray,
            sinkShip: action.sinkShip,
            shipOrientation: action.shipOrientation,
            stage: action.newStage
          }
        }
      }
    case PLAY_AGAIN:
      return initialState;
    default:
      return state;
  }
};
export default battleField;
