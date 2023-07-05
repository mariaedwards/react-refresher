import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItems = state.items.find((el) => el.id === item.id);
      state.totalQuantity++;
      if (!existingItems) {
        state.items.push({
          id: item.id,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          title: item.title,
        });
      } else {
        existingItems.quantity += 1;
        existingItems.totalPrice += item.price;
      }
    },
    removeItem(state, action) {
      const item = action.payload;
      const existingItems = state.items.find((el) => el.id === item.id);
      const quantity = existingItems.quantity;
      state.totalQuantity--;
      if (quantity > 1) {
        existingItems.quantity -= 1;
        existingItems.totalPrice -= item.price;
      } else {
        state.items = state.items.filter((el) => el.id !== item.id);
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
