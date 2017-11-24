import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import GameTitle from '../components/GameTitle';
import ChatRoom from '../components/ChatRoom';
import GameBoard from '../components/GameBoard';
import PlayInstructions from '../components/PlayInstructions';
import YourGameBoard from './YourGameBoard';
import MessageYourTurn from './MessageYourTurn';
import checkShips from '../helpFunctions/checkShips';

let PlayGame = (props) => {

// takes you to setup if not all ships are placed - Check again
  if (!checkShips(props.ships)) {
    return (
      <Redirect to='/setup' />
    );
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
        <div className='right-side'>
          <ChatRoom />
        </div>
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
