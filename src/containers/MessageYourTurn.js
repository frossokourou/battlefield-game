import React from 'react';
import {connect} from 'react-redux';

let MessageYourTurn = (props) => {
  let hitMessage = '';

  if (props.roundNumber === 0) {
    hitMessage = ' Throw the first torpedo!';
  } else {
    if (props.isYourTurn) {
      hitMessage = ' It\'s your turn to hit!';
    } else {
      if (props.didYouMiss) {
        hitMessage = 'You missed!';
      } else {
        if (props.totalShipSquares === props.squaresHit) {
          hitMessage = 'You are the winner!'
        } else {
          hitMessage = 'You hit a ship!';
        }
      }
    }
  }

  return (
    <div className='message'>
      {props.opponentTurn}
      {hitMessage}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    roundNumber: state.roundNumber,
    isYourTurn: state.isYourTurn,
    didYouMiss: state.didYouMiss,
    opponentTurn: state.opponentTurn,
    squaresHit: state.squaresHit,
    totalShipSquares: state.totalShipSquares,
    squareInTarget: state.squareInTarget,
    matrixOpponent: state.matrixOpponent,
  };
};
MessageYourTurn = connect(mapStateToProps)(MessageYourTurn);
export default MessageYourTurn;
