//import React, { Component } from 'react';
import './App.css';
import React from 'react';
import GameTitle from './components/GameTitle';
import GameInstructions from './components/GameInstructions';
import Board from './components/Board';
import Ships from './containers/Ships';
import ChatRoom from './components/ChatRoom';
import MessageToPlayer from './containers/MessageToPlayer';

const App = () => (
  <div className='App'>
    <GameTitle />
      <div className='left-side'>
        <GameInstructions />
        <Ships />
      </div>
      <div className="middle-side">
        <Board />
        <MessageToPlayer />
      </div>
      <div className='right-side'>
        <ChatRoom />
      </div>
  </div>
);
export default App;
