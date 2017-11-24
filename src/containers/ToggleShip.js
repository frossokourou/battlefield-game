import React from 'react';
import {connect} from 'react-redux';
import {changeShipOrientation} from '../actions/actionCreators';
import '../css/ships.css';

// creates the toggle button to change the ships orientation if size > 1
let ToggleShip = (props) => {
  let ind = null;
  let btn = null;

  let buttonClick = ()=> {
    if (props.selectedShipIndex > -1 && !props.ships[props.selectedShipIndex].isPlaced) {
      props.changeOrientation();
    }
  };
//if there is a selected ship and it is not placed yet
  if (props.selectedShipIndex > -1 && !props.ships[props.selectedShipIndex].isPlaced) {
    if (props.ships[props.selectedShipIndex].size > 1) {
      ind = (<p>The selected ship is {props.ships[props.selectedShipIndex].isHorizontal ? 'horizontal!' : 'vertical!'}</p>);
      btn = (<button onClick={buttonClick}>Make it {props.ships[props.selectedShipIndex].isHorizontal ? 'vertical' : 'horizontal'}</button>);
    }
  }

  return (
    <div className='makeVertical'>
      {ind}
      {btn}
    </div>
  );
};
  const mapStateToProps = (state)=> {
    return {
      ships: state.ships,
      selectedShipIndex: state.selectedShipIndex
    };
  };
  const mapDispatchToProps = (dispatch)=> {
    return {
      changeOrientation: (id)=> {
        dispatch(changeShipOrientation(id))
      }
    };
  };
ToggleShip = connect(mapStateToProps, mapDispatchToProps)(ToggleShip);
export default ToggleShip;
