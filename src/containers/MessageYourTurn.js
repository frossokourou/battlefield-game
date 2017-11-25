import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

let MessageYourTurn = (props) => {
  let hitMessage = '';
  let endMessage = '';

  if (props.roundNumber === 0) {
    hitMessage = ' Throw the first torpedo!';
  } else if (props.roundNumber === 2) {
    hitMessage = ' You are the winner!';
    endMessage = (
      <Link to='/setup'>
        <button className='buttonStart'>Play again?</button>
      </Link>
    );
  } else if (props.roundNumber === 3) {
    hitMessage = ' Computer wins!';
    endMessage = (
      <Link to='/setup'>
        <button className='buttonStart'>Play again?</button>
      </Link>
    );
  } else {
    // if (props.roundNumber === 1)
    if (props.isYourTurn) {
      hitMessage = ' It\'s your turn to hit!';
    } else {
      if (props.didYouMiss) {
        hitMessage = 'You missed!';
      } else {
        hitMessage = 'You hit a ship!';
      }
    }
  }

  return (
    <div className='message'>
      {props.opponentTurn}
      {hitMessage}
      {endMessage}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    roundNumber: state.roundNumber,
    isYourTurn: state.isYourTurn,
    didYouMiss: state.didYouMiss,
    opponentTurn: state.opponentTurn,
  };
};
MessageYourTurn = connect(mapStateToProps)(MessageYourTurn);
export default MessageYourTurn;
