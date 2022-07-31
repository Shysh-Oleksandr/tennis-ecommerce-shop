import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/product";
import IOrderItem from "./../../interfaces/orderItem";

export interface ICartState {
  cartItems: IOrderItem[];
}

const initialState: ICartState = {
  cartItems: [],
};

interface IItemQuantity {
  id: string;
  quantity: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state, { payload }: PayloadAction<IOrderItem>) => {
      state.cartItems = [...state.cartItems, payload];
    },
    changeProductQuantity: (
      state,
      { payload }: PayloadAction<IItemQuantity>
    ) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.product._id === payload.id) {
          return { ...item, quantity: payload.quantity };
        }
        return item;
      });
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product._id !== payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, changeProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
