import React from 'react';
import '../css/chatRoom.css';

const CommentForm = () => (
  <form className='forma'>
    <label htmlFor='chat' className='title'>
      Message your opponent
    </label>
    <textarea rows='3' id='chat' placeholder='Type your message here'></textarea>
    <input type='submit' value='Send'></input>
  </form>
);
export default CommentForm;
