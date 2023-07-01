import classes from './Cart.module.css';
import Modal from '../ui/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cartContext';
import CartItem from './CartItem';

const Cart = (props) => {
  const { onClose } = props;
  const {
    items: cartItems,
    totalAmount,
    addItem,
    removeItem,
  } = useContext(CartContext);
  const hasItems = cartItems.length > 0;

  return (
    <Modal onClose={onClose}>
      <ul className={classes['cart-items']}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={addItem.bind(null, item)}
            onRemove={removeItem.bind(null, item.id)}></CartItem>
        ))}
      </ul>
      <div className={classes['total']}>
        <span>Total</span>
        <span>${totalAmount || 0}</span>
      </div>
      <div className={classes['actions']}>
        <button onClick={onClose} className={classes['button--alt']}>
          Close
        </button>
        {hasItems && <button className={classes['button']}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
