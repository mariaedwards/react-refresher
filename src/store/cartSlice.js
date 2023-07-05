import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  wasTouched: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.wasTouched = false;
    },
    addItem(state, action) {
      const item = action.payload;
      const existingItems = state.items.find((el) => el.id === item.id);
      state.wasTouched = true;
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
      state.wasTouched = true;
      if (quantity > 1) {
        existingItems.quantity -= 1;
        existingItems.totalPrice -= item.price;
      } else {
        state.items = state.items.filter((el) => el.id !== item.id);
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://react-refresher-476ad-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://react-refresher-476ad-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const cart = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: cart.items || [],
          totalQuantity: cart.totalQuantity || 0,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
