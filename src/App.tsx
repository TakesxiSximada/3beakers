import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import { selectBeaker } from './store'

const printBeaker = (beaker: any) => (<span><span>{beaker.currentCount}</span><hr /><span className="MaxCount">{beaker.maxCount}</span></span>);

function App(props: any) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>3 Beakers</h1>
        <div className="BeakerList">
        {
          props.beakerList.map(
            (beaker: any, index: number) => {
	      const classStyle = props.sourceIndex == index ? "Beaker selected" : "Beaker";
	      return (<div className={classStyle} onClick={props.selectBeaker} data-index={index} key={index}>{printBeaker(beaker)}</div>);
            }
          )
        }
        </div>
        {
          props.isCompleted() && (
              <div>
                <p>Game Clear</p>
                <p>Congratulations!!</p>
              </div>
          )
        }
      </header>

      <hr />
      <footer>
        <a href="https://github.com/TakesxiSximada/3beakers/archive/refs/heads/main.zip">Download</a>
        <a href="https://github.com/TakesxiSximada/3beakers">Repository</a>
        <a href="https://github.com/TakesxiSximada/3beakers/blob/main/COPYING">License</a>
        <a href="https://blog.symdon.info/posts/1644328105/">Tech Stack</a>
      </footer>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    beakerList: state.beakerList,
    isCompleted: () => state.beakerList.some((elm: any) => elm.currentCount == 4),
    sourceIndex: state.sourceIndex,
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
