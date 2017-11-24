import React from 'react';
import {connect} from 'react-redux';
import {changeSquareTarget, throwBomb, addToHitCounter, opponentAboutToPlay} from '../actions/actionCreators';
import '../css/board.css';

class PlaySquare extends React.Component {
  constructor(props) {
    super(props);
    this.throwTorpedo = this.throwTorpedo.bind(this);
  }

  throwTorpedo = (e) => {
    if (this.props.isYourTurn) {
      // array distructuring
      let [x, y] = e.target.id.split('-');
      x = parseInt(x, 10);
      y = parseInt(y, 10);
      console.log('x, ', x, ' y ', y);

      // if you have already hit this square, choose another one
      if (this.props.matrixOpponent[y][x] === 'X' || this.props.matrixOpponent[y][x] === 'o') {
        console.log('already hit there');
        this.props.changeSquareTarget(x, y);
      } else if (this.props.matrixOpponent[y][x] === null) {
        console.log('you missed!');
        this.props.throwBomb('o', x, y);
      } else {
        console.log('you hit a ship!');
        this.props.throwBomb('X', x, y);
        this.props.addToHitCounter();
      }
      this.props.opponentAboutToPlay(this.props.matrix);
    }
  };
  render() {
    let styleForGame = 'square';
    // object destructuring
    let {x, y, matrixOpponent} = this.props;
    if (matrixOpponent[y][x] === 'X') {
      styleForGame += ' squareHit';
    }
    if (matrixOpponent[y][x] === 'o') {
      styleForGame += ' squareMissed'
    }

    return (
      <div
        id={`${x}-${y}`}
        onClick={this.throwTorpedo}
        className={styleForGame}>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    matrixOpponent: state.matrixOpponent,
    matrix: state.matrix,
    isYourTurn: state.isYourTurn
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeSquareTarget: (string, x, y) => {
      dispatch(changeSquareTarget(string, x, y))
    },
    throwBomb: (string, x, y) => {
      dispatch(throwBomb(string, x, y))
    },
    addToHitCounter: () => {
      dispatch(addToHitCounter())
    },
    opponentAboutToPlay: (matrix) => {
      dispatch(opponentAboutToPlay(matrix))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaySquare);
