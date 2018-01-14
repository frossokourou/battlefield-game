import BOARD_DIMENSION from '../actions/data';

// randomly throws a torpedo
const opponentMove = (matrix, previousHit, hittingMoves, callback) => {
  let message = '';
  let string = previousHit.isItX;
  let x = previousHit.prevX;
  let y = previousHit.prevY;
  let {stage, positionArray, sinkShip, shipOrientation} = hittingMoves;
  let newStage = stage;
  let move, checkNewMove;

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
  };
  const initializeHit = () => {
    newStage = 0;
    // choose next hit randomly
    move = randomHit();
    x = move.x;
    y = move.y;
    // make new move
    checkNewMove = makeNewMove(x, y);
    if (checkNewMove.string === 'X') {
      // initialize hit
      sinkShip = [];
      newStage = 1;
      positionArray = createPositionArray(x, y);
    }
  };

  // wait 2 to 4 seconds and choose the target square
  let timeWait = Math.random() * (1500 - 1000) + 1000;
  // let handle =
  setTimeout(function() {

    switch (stage) {
      case 1:
        // have hit first square of a ship -> find ship orientation
        let flag = false;
        for (let i = sinkShip.length; i < positionArray.length; i++) {
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
            flag = true;
            break;
         }
        }
        if (!flag) {
          initializeHit();
        }
        break;
      case 2:
      // found ship orientation -> moving one side
        if (shipOrientation === 1) {
          /* hit square above */
          if (y === 0) {
            initializeHit();
          } else {
            y = y - 1;
            if (matrix[y][x] === 'X' || matrix[y][x] === 'o') {
              // if the square has already been hit
              initializeHit();
            } else {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                newStage = 0;
              }
            }
          }

        } else if (shipOrientation === 3) {
          /* hit square on the left */
          if (x === 0) {
            initializeHit();
          } else {
            x = x - 1;
            if (matrix[y][x] === 'X' || matrix[y][x] === 'o') {
              initializeHit();
            } else {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                newStage = 0;
              }
            }
          }

        } else if (shipOrientation === 0) {
          /* hit square below */
          const hitOpposite = () => {
            let flags = false;
            let k = y;
            for (let j = 0; j < k; j++) {
              y = y - 1;
              if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
                flags = true;
                break;
              }
            }
            if (flags) {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                // next time play randomly
                newStage = 0;
              } else {
                // next time hit above
                shipOrientation = 1;
              }
            } else {
              initializeHit();
            }
          };

          if (y === BOARD_DIMENSION - 1) {
            hitOpposite();
          } else {
            y = y + 1;
            if (matrix[y][x] === 'X' || matrix[y][x] === 'o') {
              // then hit on the opposite side
              hitOpposite();
            } else {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                newStage = 3;
              }
            }
          }

        } else if (shipOrientation === 2) {
          /* hit square on the right */
          const oppositeHit = () => {
            let flags = false;
            let k = x;
            for (let j = 0; j < k; j++) {
              x = x - 1;
              if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
                flags = true;
                break;
              }
            }
            if (flags) {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                newStage = 0;
              } else {
                // next time hit left
                shipOrientation = 3;
              }
            } else {
              initializeHit();
            }
          };


          if (x === BOARD_DIMENSION - 1) {
            oppositeHit();
          } else {
            x = x + 1;
            if (matrix[y][x] === 'X' || matrix[y][x] === 'o') {
              // then hit on the opposite side
              oppositeHit();

            } else {
              checkNewMove = makeNewMove(x, y);
              if (checkNewMove.string === 'o') {
                newStage = 3;
              }
            }
          }
        }
        break;
      case 3:
        // moving to the opposite side
        if (shipOrientation === 0) {
          let k = y;
          for (let j = 0; j < k; j++) {
            y = y - 1;
            if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
              k = -1;
              break;
            }
          }
          if (k === -1) {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            }
          } else {
            initializeHit();
          }

        } else if (shipOrientation === 2) {
          let k = x;
          for (let j = 0; j < k; j++) {
            x = x - 1;
            if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
              k = -1;
              break;
            }
          }
          if (k === -1) {
            checkNewMove = makeNewMove(x, y);
            if (checkNewMove.string === 'o') {
              newStage = 0;
            }
          } else {
            initializeHit();
          }

        }
        break;
      default:
        // choose next hit randomly
        initializeHit();
    }

    // TODO: check the case of single square ship (done) -> TODO

    // TODO: check if the new square exists! -> case 3 (done)

    // TODO: check if the chosen square has already been hit (done)

    // TODO: check if the square hit is placed on the border (e.g. x: 0, y: 3) (done)

    return callback({string, x, y, message, positionArray, sinkShip, shipOrientation, newStage});
  }, timeWait);
};
export default opponentMove;
