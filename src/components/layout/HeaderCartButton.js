import CartIcon from '../cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cartContext';

const HeaderCartButton = ({ onShowCart }) => {
  const ctx = useContext(CartContext);
  const count = ctx.items.reduce((acc, item) => acc + item.amount, 0);
  const [btnAnimated, setBtnIsAnimated] = useState(false);
  const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ''}`;

  useEffect(() => {
    if (ctx.items.length > 0) {
      setBtnIsAnimated(true);
    }

    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button onClick={onShowCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{count || 0}</span>
    </button>
  );
};

export default HeaderCartButton;
