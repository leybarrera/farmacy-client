import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
// Redux store configuration
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Para que no me de error al guardar el store en el local storage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
