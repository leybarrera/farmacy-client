import { createSlice } from '@reduxjs/toolkit';
import storageUtils from '../../utils/storage.utils';

const initialState = {
  shoppingCart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.shoppingCart = action.payload;
    },

    addToCart: (state, action) => {
      const producto = action.payload;
      const indexProducto = state.shoppingCart.findIndex(
        (product) => product.id == producto.id
      );
      if (indexProducto !== -1) {
        state.shoppingCart[indexProducto].cantidad += 1;
      } else {
        state.shoppingCart = [
          ...state.shoppingCart,
          {
            ...producto,
            cantidad: 1,
          },
        ];
      }
      storageUtils.saveData('cart', state.shoppingCart);
    },

    reduceItem: (state, action) => {
      const producto = action.payload;
      const indexProducto = state.shoppingCart.findIndex(
        (product) => product.id === producto.id
      );
      if (state.shoppingCart[indexProducto].cantidad - 1 == 0) {
        const newShoppingCart = state.shoppingCart.filter(
          (product) => product.id !== producto.id
        );
        state.shoppingCart = newShoppingCart;
      } else {
        state.shoppingCart[indexProducto].cantidad -= 1;
      }
    },

    removeItem: (state, action) => {
      const producto = action.payload;
      const newItems = state.shoppingCart.filter(
        (product) => product.id !== producto.id
      );
      state.shoppingCart = newItems;
    },

    clearCart: (state) => {
      state.shoppingCart = [];
      storageUtils.deleteData('cart');
    },
  },
});

export const { addToCart, getCart, clearCart, reduceItem, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
