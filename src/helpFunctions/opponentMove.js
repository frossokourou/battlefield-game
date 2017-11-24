import BOARD_DIMENSION from '../actions/data';

// randomly throws a torpedo
const opponentMove = (matrix, callback) => {
  let message = '';
  let string = '';
  let x = -1;
  let y = -1;
  // wait 2 to 4 seconds and choose the target square
  let timeWait = Math.random() * (3000 - 1800) + 1800;
  // let handle = 
  setTimeout(function() {

    for (let i = 0; i <= 100; i++) {
      x = Math.floor(Math.random() * BOARD_DIMENSION);
      y = Math.floor(Math.random() * BOARD_DIMENSION);
      console.log('PC targets ', x, ', ', y);
      if (matrix[y][x] !== 'X' && matrix[y][x] !== 'o') {
        if (matrix[y][x] !== null) {
          string = 'X';
          message = 'Your ship was hit!';
        } else {
          string = 'o';
          message = 'Your opponent missed!';
        }
        break;
      }
    }
    callback({string, x, y, message});
  }, timeWait);

  // return {string, x, y, message};
};
export default opponentMove;
