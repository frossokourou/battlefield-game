import React from 'react';
import '../css/gameInstructions.css';

const GameInstructions = ()=> (
  <div>
    <h3>Instructions</h3>
    <ol className='instructions instructions-size'>
      <li>Click on a ship to select it.</li>
      <li>You can change the selected ship's orientation.</li>
      <li>Click on the board to choose the ship's position.</li>
      <li>Click on a ship to change its selected position and orientation.</li>
      <li>Repeat the above until you have placed all of your ships.</li>
    </ol>
  </div>
);
export default GameInstructions;
