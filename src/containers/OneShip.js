import React from 'react';
import {connect} from 'react-redux';
import {selectShip} from '../actions/actionCreators';
import '../css/ships.css';

// OneShip creates each ship according to size
let OneShip = (props)=> {

  let clickOnShip = ()=> {
    if (!props.ships[props.shipIndex].isPlaced) {
      props.selectShip(props.shipIndex);
    }
  };
  let ship = props.ships[props.shipIndex];
// the array of ships to show
  let wholeShip = [];
  let colorClass = 'colorShip';
  if (ship.isPlaced) {
    colorClass = 'colorShipPlaced';
  } else if (props.shipIndex === props.selectedShipIndex) {
    colorClass = 'colorShipSelected';
  }

  for (let i = 0; i < ship.size; i++) {
    wholeShip.push(
      <div className={`ship ${colorClass}`} onClick={clickOnShip} key={i}></div>
    );
  }
  return (
    <div>
      {wholeShip}
    </div>
  );
};
// connects to the state (to the selectedShipIndex)
const mapStateToProps = (state)=> {
  return {
    selectedShipIndex: state.selectedShipIndex,
    ships: state.ships
  }
};
// connects to store.dispatch for action creator selectShip
const mapDispatchToProps = (dispatch)=> {
  return {
    selectShip: (id)=> {
      dispatch(selectShip(id))
    }
  }
};
OneShip = connect(mapStateToProps, mapDispatchToProps)(OneShip);
export default OneShip;
