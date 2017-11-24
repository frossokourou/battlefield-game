import React from 'react';
import {connect} from 'react-redux';

let YourSquare = (props) => {
  // changes the color of the squares where your ships are located
  let styleForShip = 'square squareSmaller';

    if (props.matrix[props.y][props.x] != null) {
      styleForShip += ' squareShip';
    }
  return (
    <div id={`${props.x}-${props.y}`}
      className={styleForShip}>
      <span className='textInSquare'></span>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    matrix: state.matrix
  };
};
YourSquare = connect(mapStateToProps)(YourSquare);
export default YourSquare;
