import BOARD_DIMENSION from '../actions/data';

// randomly throws a torpedo
const opponentMove = (matrix, previousHit, hittingMoves, callback) => {
  let message = '';
  let string = previousHit.isItX;
  let x = previousHit.prevX;
  let y = previousHit.prevY;
  let {stage, positionArray, sinkShip, shipOrientation} = hittingMoves;
  let newStage = stage;
  let l = sinkShip.length;
  let move;

  const makeNewMove = (x, y) => {
      if (matrix[y][x] !== null) {
        string = 'X';
        message = 'Your ship was hit!';
      } else {
        string = 'o';
        message = 'Your opponent missed!';
      }
    return {string, x, y, message};
  };
  const randomHit = () => {
    // choose next hit randomly
    for (let i = 0; i <= 100; i++) {
      x = Math.floor(Math.random() * BOARD_DIMENSION);
      y = Math.floor(Math.random() * BOARD_DIMENSION);
      // this square has not been hit before
      if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
        console.log('PC targets ', x, ', ', y);
        break;
      }
    }
    return {x, y};
  };
  const createPositionArray = (x, y) => {
    let positionArray = [{id: 0, x: x, y: y + 1}, {id: 1, x: x, y: y - 1}, {id: 2, x: x + 1, y: y}, {id: 3, x: x - 1, y: y}];
    if (x === 0) {
      positionArray.splice(3, 1);
    }
    if (x === BOARD_DIMENSION - 1) {
      positionArray.splice(2, 1);
    }
    if (y === 0) {
      positionArray.splice(1, 1);
    }
    if (y === BOARD_DIMENSION - 1) {
      positionArray.splice(0, 1);
    }
    return positionArray;
  }

  // wait 2 to 4 seconds and choose the target square
  let timeWait = Math.random() * (30 - 18) + 18;
  // let handle =
  setTimeout(function() {
    let checkNewMove;
    switch (stage) {
      case 1:
        // have hit first square of a ship -> find ship orientation
        for (let i = l; i < positionArray.length; i++) {
          x = positionArray[i].x;
          y = positionArray[i].y;
          sinkShip.push(positionArray[i]);
          // this square has not been hit before
          if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
            // when x and y are decided, make the new move
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'X') {
              shipOrientation = positionArray[i].id;
              newStage = 2;
            }
            break;
         }
        }
        if (l === positionArray.length) {
          newStage = 0;
          // choose next hit randomly -> same as default case
          move = randomHit();
          x = move.x;
          y = move.y;
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'X') {
            sinkShip = [];
            newStage = 1;
            positionArray = createPositionArray(x, y);
          }
        }
        break;
      case 2:
      // found ship orientation -> moving one side
        if (shipOrientation === 1) {
          /* hit square above */
          y = y - 1;

          if (matrix[y][x] === 'X' || matrix[y][x] === 'o' || y === 0) {
            // if the square has already been hit
            newStage = 0;
          } else {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            }
          }

        } else if (shipOrientation === 3) {
          /* hit square on the left */
          x = x - 1;

          if (matrix[y][x] === 'X' || matrix[y][x] === 'o' || x === 0) {
            newStage = 0;
          } else {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            }
          }

        } else if (shipOrientation === 0) {
          /* hit square below */
          y = y + 1;

          if (matrix[y][x] === 'X' || matrix[y][x] === 'o' || y > BOARD_DIMENSION - 1) {
            // then hit on the opposite side
            let k = y;
            for (let j = 0; j < k; j++) {
              y = y - 1;
              if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
                break;
              }
            }
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            } else {
              shipOrientation = 1;
            }
          } else {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 3;
            }
          }

        } else if (shipOrientation === 2) {
          /* hit square on the right */
          x = x + 1;

          if (matrix[y][x] === 'X' || matrix[y][x] === 'o' || x > BOARD_DIMENSION - 1) {
            // then hit on the opposite side
            let k = x;
            for (let j = 0; j < k; j++) {
              x = x - 1;
              if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
                break;
              }
            }
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            } else {
              shipOrientation = 3;
            }
          } else {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 3;
            }
          }
        }
        break;
      case 3:
        // moving to the opposite side
        if (shipOrientation === 0) {
          for (let j = 0; j < BOARD_DIMENSION; j++) {
            y = y - 1;
            if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
              break;
            }
          }
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 0;
          }
        } else if (shipOrientation === 2) {
          for (let k = 0; k < BOARD_DIMENSION; k++) {
            x = x - 1;
            if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
              break;
            }
          }
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 0;
          }
        }
        break;
      default:
        // choose next hit randomly
        move = randomHit();
        x = move.x;
        y = move.y;
        // when x and y are decided, make the new move
        checkNewMove = makeNewMove(x, y);
        if (checkNewMove.string === 'X') {
          sinkShip = [];
          newStage = 1;
          positionArray = createPositionArray(x, y);
        }
    }

    // TODO: check the case of single square ship (done?)

    // TODO: check if the new square exists!

    // TODO: check if the chosen square has already been hit (done?)

    // TODO: check if the square hit is placed on the border (e.g. x: 0, y: 3) (done?)

    return callback({string, x, y, message, positionArray, sinkShip, shipOrientation, newStage});
  }, timeWait);
};
export default opponentMove;
