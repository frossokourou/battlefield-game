//import React, { Component } from 'react';
import './App.css';
import React from 'react';
import GameInstructions from './components/GameInstructions';
import Board from './components/Board';
import Ships from './containers/Ships';
import ChatRoom from './components/ChatRoom';
import MessageToPlayer from './containers/MessageToPlayer';
import './css/gameTitle.css';

const App = () => (
  <div className='App'>
    <div className='titleBox'>
      <h2 className='title'>Battlefield Game</h2>
      <p>Use the instructions to place your ships and play the game!</p>
    </div>
    <div className='left-side'>
      <GameInstructions />
      <Ships />
    </div>
    <div className="middle-side">
      <Board />
      <MessageToPlayer />
    </div>
    {/* <div className='right-side'>
      <ChatRoom />
    </div> */}
  </div>
);
export default App;
