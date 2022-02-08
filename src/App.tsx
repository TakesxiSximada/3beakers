import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import { selectBeaker } from './store'


const printBeaker = (beaker: any) => `${beaker.currentCount} / ${beaker.maxCount}`;

function App(props: any) {
  return (
    <div className="App">
      {
	props.isCompleted() && (
	    <div>
	      <span>Game Clear</span>
	      <span>Congratulations!!</span>
	    </div>
	)
      }
      <header className="App-header">
        {
          props.beakerList.map(
            (beaker: any, index: number) => (
	      <span onClick={props.selectBeaker} data-index={index} key={index}>{printBeaker(beaker)}</span>
	    )
	  )
        }
      </header>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    beakerList: state.beakerList,
    isCompleted: () => state.beakerList.some((elm: any) => elm.currentCount == 4),
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectBeaker: (event: any) => {
      const index = event.currentTarget.getAttribute("data-index");
      dispatch(selectBeaker(index));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
