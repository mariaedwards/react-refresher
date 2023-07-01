import Input from '../ui/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = Number(inputRef.current.value);
    if (
      Number.isNaN(enteredAmount) ||
      enteredAmount < 1 ||
      enteredAmount > 10
    ) {
      setAmountIsValid(false);
      return;
    }
    props.addMealItemToCart(enteredAmount);
  };

  const inputRef = useRef();

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && (
        <span className={classes.error}>
          Please enter a number between 1 and 10
        </span>
      )}
    </form>
  );
};

export default MealItemForm;
