import React from 'react';
import {connect} from 'react-redux';
import GameTitle from '../components/GameTitle';
import ChatRoom from '../components/ChatRoom';
import GameBoard from '../components/GameBoard';
import PlayInstructions from '../components/PlayInstructions';
import YourGameBoard from './YourGameBoard';
import MessageYourTurn from './MessageYourTurn';
import checkShips from '../helpFunctions/checkShips';

let PlayGame = (props) => {
  let test = checkShips(props.ships);
// takes you to setup if not all ships are placed - Check again
  if (!test) {
    props.history.replace({
      pathname: '/setup'
    });
  }
  return (
    <div className='App'>
      <GameTitle />
        <div className='left-side'>
          <PlayInstructions />
          <YourGameBoard />
        </div>
        <div className="middle-side">
          <GameBoard />
          <MessageYourTurn />
        </div>
        {/* <div className='right-side'>
          <ChatRoom />
        </div> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ships: state.ships
  };
};
PlayGame = connect(mapStateToProps)(PlayGame);
export default PlayGame;
