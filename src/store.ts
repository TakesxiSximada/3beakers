import { createStore } from "redux";

const initialState = {
  beakerList: [
    {
      currentCount: 8,
      maxCount: 8,
    },
    {
      currentCount: 0,
      maxCount: 5,
    },
    {
      currentCount: 0,
      maxCount: 3,
    },
  ],
  sourceIndex: null,
};

// Action Type
const SELECT_BEAKER = "SELECT_BEAKER";

// Action Creator
export const selectBeaker = (index: number) => ({type: SELECT_BEAKER, index: index});

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_BEAKER:
      if (state.sourceIndex == null) {
	return {
	  ...state,
	  sourceIndex: action.index,
	}
      } else {
	const srcBeaker = state.beakerList[state.sourceIndex];
	const destBeaker = state.beakerList[action.index];
	const avaiableCount = destBeaker.maxCount - destBeaker.currentCount;
	const movableCount = srcBeaker.currentCount <= avaiableCount ? srcBeaker.currentCount : avaiableCount;
	const newBeakerList = state.beakerList.map(
	  (beaker: any, index: number) => {
	    if (index === state.sourceIndex) {  // source beaker
	      return {
		...beaker,
		currentCount: beaker.currentCount - movableCount,
	      }
	    } else if (index === action.index) {  // destination beaker
	      return {
		...beaker,
		currentCount: beaker.currentCount + movableCount,
	      }
	    } else {
	      return beaker;
	    }
	  }
	);
	return {
	  ...state,
	  sourceIndex: null,
	  beakerList: newBeakerList,
	}
      }
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
