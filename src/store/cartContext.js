import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let existingItemIndex = -1;
  let totalAmount = 0;
  switch (action.type) {
    case 'ADD_ITEM':
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      totalAmount = state.totalAmount + action.item.price * action.item.amount;
      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...state.items[existingItemIndex],
          amount: state.items[existingItemIndex].amount + action.item.amount,
        };
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
        return {
          items: updatedItems,
          totalAmount,
        };
      } else
        return {
          ...state,
          items: [...state.items, action.item],
          totalAmount,
        };
    case 'REMOVE_ITEM':
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      totalAmount = state.totalAmount - existingItemIndex.price;
      const existingItem = state.items[existingItemIndex];
      const amount = existingItem.amount;
      if (amount > 1) {
        const updatedItem = {
          ...existingItem,
          amount: amount - 1,
        };
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
        return {
          items: updatedItems,
          totalAmount,
        };
      } else {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.id
        );
        return {
          items: updatedItems,
          totalAmount,
        };
      }

    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  };

  const ctx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
  };
  return (
    <CartContext.Provider value={ctx}>{props.children}</CartContext.Provider>
  );
};

export default CartContext;
