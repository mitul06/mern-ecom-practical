import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";
import cetegoryReducer from "./features/categorySlice";
import brandReducer from "./features/brandSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    productReducer,
    authReducer,
    cetegoryReducer,
    brandReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
