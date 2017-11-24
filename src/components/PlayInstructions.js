import React from 'react';

const PlayInstructions = () => {
  return (
    <div>
      <h3>Instructions</h3>
      <ol className='instructions'>
        <li>Click on the board to throw a torpedo.</li>
        <li>If you hit a ship, it turns red.</li>
        <li>Guess the position of your opponent's ships.</li>
        <li>Destroy your opponent's ships before you lose yours!</li>
        <li>Good luck!</li>
      </ol>
    </div>
  );
}
export default PlayInstructions;
