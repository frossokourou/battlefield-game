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
  // let ind = -1;
  // let initialX = hittingMoves.initialX;
  // let initialY = hittingMoves.initialY;
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

  // wait 2 to 4 seconds and choose the target square
  let timeWait = Math.random() * (30 - 18) + 18;
  // let handle =
  setTimeout(function() {
    let checkNewMove;
    switch (stage) {
      case 1:
        // have hit first square of a ship -> find ship orientation
        let flag = false;
        for (let i = l; i < positionArray.length; i++) {
          x = positionArray[i].x;
          y = positionArray[i].y;
          sinkShip.push(positionArray[i]);
          // this square has not been hit before
          if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
            // when x and y are decided, make the new move
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'X') {
              shipOrientation = i;
              newStage = 2;
              flag = true;
            }
            break;
          }
        }
        if (!flag) {
          newStage = 0;
        }
        break;
      case 2:
      // found ship orientation -> moving one side
        if (shipOrientation === 1) {
          /* hit square above */
//        x = x;
          y = y - 1;
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 0;
          }

        } else if (shipOrientation === 3) {
          /* hit square on the left */
//        y = y;
          x = x - 1;
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 0;
          }
        } else if (shipOrientation === 0) {
          /* hit square below */
//        x = x;
          y = y + 1;
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 3;
          }
        } else if (shipOrientation === 2) {
          /* hit square on the right */
//        y = y;
          x = x + 1;
          checkNewMove = makeNewMove(x, y);
          if (checkNewMove.string === 'o') {
            newStage = 3;
          }
        }
        break;
      case 3:
        // moving to the opposite side
        if (shipOrientation === 0) {
          for (let j = 0; j < BOARD_DIMENSION; j++) {
//          x = x;
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
//          y = y;
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
        for (let i = 0; i <= 100; i++) {
          x = Math.floor(Math.random() * BOARD_DIMENSION);
          y = Math.floor(Math.random() * BOARD_DIMENSION);
          // this square has not been hit before
          if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
            console.log('PC targets ', x, ', ', y);
            break;
          }
        }
        // when x and y are decided, make the new move
        checkNewMove = makeNewMove(x, y);
        if (checkNewMove.string === 'X') {
          positionArray = [{x: x, y: y + 1}, {x: x, y: y - 1}, {x: x + 1, y: y}, {x: x - 1, y: y}];
          sinkShip = [];
          newStage = 1;
        }
    }

    // TODO: check the case of single square ship

    // TODO: check if the new square exists!

    // TODO: check if the chosen square has already been hit

    // TODO: check if the square hit is placed on the border (e.g. x: 0, y: 3)

    return callback({string, x, y, message, positionArray, sinkShip, shipOrientation, newStage});
  }, timeWait);
};
export default opponentMove;
