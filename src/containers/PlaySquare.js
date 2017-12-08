import React from 'react';
import {connect} from 'react-redux';
import {changeSquareTarget, throwBomb, opponentAboutToPlay} from '../actions/actionCreators';
import '../css/board.css';

class PlaySquare extends React.Component {
  constructor(props) {
    super(props);
    this.throwTorpedo = this.throwTorpedo.bind(this);
  }

  throwTorpedo = (e) => {
    if (this.props.isYourTurn) {
      if (this.props.gamePhase === 0 || this.props.gamePhase === 1) {
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
        }
          this.props.opponentAboutToPlay(this.props.matrix, this.props.previousHit, this.props.hittingMoves);
      }
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
    isYourTurn: state.isYourTurn,
    gamePhase: state.gamePhase,
    previousHit: state.previousHit,
    hittingMoves: state.hittingMoves
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
    opponentAboutToPlay: (matrix, previousHit, hittingMoves) => {
      dispatch(opponentAboutToPlay(matrix, previousHit, hittingMoves))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaySquare);
