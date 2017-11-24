import BOARD_DIMENSION from '../actions/data';

// ramdomly creates the matrix of the opponent's ships
const setupMatrixOpponent = (ships) => {
  let shipsOpponent = [];
  let totalShipSquares = 0;
  // let matrixOpponent = new Array(BOARD_DIMENSION).fill(new Array(BOARD_DIMENSION).fill(null));
  let matrixOpponent = new Array(BOARD_DIMENSION).fill(1).map((elem) => {
    return new Array(BOARD_DIMENSION).fill(null)
  });

  ships.forEach((ship) => {
    // max index so that the ship fits the line
    const maxIndex = BOARD_DIMENSION - ship.size;
    let x, y, isHorizontal;
    for (let i = 0; i <= 100; i++) {
      // decide if the ship will be horizontal
      isHorizontal = Math.random() > 0.5 ? true : false;
      let check = 0;
      if (isHorizontal) {
        // decide the starting point of the ship
        x = Math.floor(Math.random() * maxIndex);
        y = Math.floor(Math.random() * BOARD_DIMENSION);
        // check if there is already a ship here
        for (let k = x; k < x + ship.size; k++) {
          if (matrixOpponent[y][k] === null) {
            check++
          }
        }
        if (check === ship.size){
        // place the ship on matrixOpponent
          for (let l = x; l < x + ship.size; l++) {
            matrixOpponent[y][l] = ship.id;
          }
          break;
        }
      } else {
        // decide the starting point of the ship
        x = Math.floor(Math.random() * BOARD_DIMENSION);
        y = Math.floor(Math.random() * maxIndex);
        // check if there is already a ship here
        for (let m = y; m < y + ship.size; m++) {
          if (matrixOpponent[m][x] === null) {
            check++
          }
        }
        if (check === ship.size){
        // place the ship on matrixOpponent
          for (let n = y; n < y + ship.size; n++) {
            matrixOpponent[n][x] = ship.id;
          }
          break;
        }
      }
    }
    let newShip = {
      id: ship.id,
      isHorizontal: isHorizontal,
      size: ship.size,
      xFirst: x,
      yFirst: y
    };
    shipsOpponent.push(newShip);
    // calculate totalShips to find the winner
    totalShipSquares += ship.size;
  });
  return {matrixOpponent, shipsOpponent, totalShipSquares};
}
export default setupMatrixOpponent;
