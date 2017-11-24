import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {changePhase, opponentSetup} from '../actions/actionCreators';
import checkShips from '../helpFunctions/checkShips';
import '../css/messages.css';

let MessageToPlayer = (props)=> {

  const startGame = () => {
    props.changePhase(3);
    props.opponentSetup();
  }

  let messageToPlayer;
  if (props.gamePhase === 1) {
    messageToPlayer = 'Place your ships to start the game!';
  } else if (props.gamePhase === 2) {
    messageToPlayer = 'All ships are placed!';
  }

  let btnStart = null;
  // Check if all ships are placed
  if (checkShips(props.ships)) {
    btnStart = (
      <Link to='/play_game'>
        <button className='buttonStart' onClick={startGame}>Start the game</button>
      </Link>
    );
  }
  return (
    <div className='message'>
      {messageToPlayer}
      {btnStart}
    </div>
  );
};
const mapStateToProps = (state)=> {
  return {
    gamePhase: state.gamePhase,
    ships: state.ships
  };
};
const mapDispatchToProps = (dispatch)=> {
  return {
    changePhase: (string)=> {
      dispatch(changePhase(string))
    },
    opponentSetup: () => {
      dispatch(opponentSetup())
    }
  };
};
MessageToPlayer = connect(mapStateToProps, mapDispatchToProps)(MessageToPlayer);
export default MessageToPlayer;
