import { createStore } from 'redux';

const initialState = {
  counter: 0,
  showCounter: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + action.payload };
    case 'DECREMENT':
      return { ...state, counter: state.counter - action.payload };
    case 'TOGGLE_COUNTER':
      return {
        ...state,
        showCounter: !state.showCounter,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
