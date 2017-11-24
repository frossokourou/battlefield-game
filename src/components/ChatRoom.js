import React from 'react';
import '../css/chatRoom.css';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ChatRoom = ()=> (
  <div className='chatRoom'>
    <h3>Chat with your opponent</h3>
    <CommentList />
    <CommentForm />
  </div>
);
export default ChatRoom;
