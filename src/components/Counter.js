import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);
  const incrementCounterHandler = (payload) => {
    dispatch({ type: 'INCREMENT', payload });
  };
  const decrementCounterHandler = (payload) => {
    dispatch({ type: 'DECREMENT', payload });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: 'TOGGLE_COUNTER' });
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && (
        <>
          <div className={classes.value}>{counter}</div>
          <button onClick={() => incrementCounterHandler(1)}>
            Increment Counter
          </button>
          <button onClick={() => decrementCounterHandler(1)}>
            Decrement Counter
          </button>
          <button onClick={() => incrementCounterHandler(5)}>
            Increment Counter by 5
          </button>
          <button onClick={() => decrementCounterHandler(10)}>
            Decrement Counter by 10
          </button>
        </>
      )}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
