import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";
import next from "next";

interface IGrocery {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICartSlice {
  cartData: IGrocery[];
  subTotal: number;
  deliveryFee: number;
  finalTotal: number;
}

const initialState: ICartSlice = {
  cartData: [],
  subTotal: 0,
  deliveryFee: 40,
  finalTotal: 40,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<IGrocery>) => {
      state.cartData.push(action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<mongoose.Types.ObjectId>
    ) => {
      const item = state.cartData.find(
        (i) => i._id?.toString() === action.payload.toString()
      );

      if (item) {
        item.quantity += 1;
      }
      cartSlice.caseReducers.calculateTotal(state);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<mongoose.Types.ObjectId>
    ) => {
      const item = state.cartData.find(
        (i) => i._id?.toString() === action.payload.toString()
      );
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      }
      cartSlice.caseReducers.calculateTotal(state);
    },

    deleteFromCart: (state, action) => {
      state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },

    calculateTotal: (state) => {
      state.subTotal = state.cartData.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
      state.deliveryFee = state.subTotal > 100 ? 0 : 40;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },
  },
});

export const { addTocart, increaseQuantity, decreaseQuantity, deleteFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
