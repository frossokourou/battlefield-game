// checks if all ships are placed

const checkShips = (ships) => {
  console.log('paparia');
  let allShips = true;
  for (let i = 0; i < ships.length; i++) {
    if (!ships[i].isPlaced) {
      allShips = false;
      break;
    }
  }
  return allShips;
};
export default checkShips;
