import React from 'react';
import {Link} from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='App'>
      <h2 className='title'>Welcome to the Battlefield Game!</h2>
      <Link to='/setup'><button className='buttonStart'>Click here to play!</button></Link>
    </div>
  );
};
export default Welcome;
