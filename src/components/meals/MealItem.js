import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../store/cartContext';
const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const addMealItemToCart = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <p className={classes.name}>{props.name}</p>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>${props.price.toFixed(2)}</p>
      </div>
      <div>
        <MealItemForm id={props.id} addMealItemToCart={addMealItemToCart} />
      </div>
    </li>
  );
};

export default MealItem;
