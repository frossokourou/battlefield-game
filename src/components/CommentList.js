import React from 'react';
import '../css/chatRoom.css';

let comments = ['Wanna play?', 'Share the game link', 'Ready!', "Let's play"];
// comments should be an array of objects {player, comment} in the state
const CommentList = ()=> (
  <div className='chatlistContainer'>
    <ul className='comment-list'>
      {comments.map((com, index)=> (
        <li key={index}>{com}</li>
      ))}
    </ul>
  </div>
);
export default CommentList;
