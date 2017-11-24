// checks if all ships are placed

const checkShips = (ships) => {
  let sum = 0;
  for (let i = 0; i < ships.length; i++) {
    if (ships[i].isPlaced) {
      sum++;
    }
  }
  if (sum === ships.length) {
    return true;
  } else {
    return false;
  }
};
export default checkShips;
