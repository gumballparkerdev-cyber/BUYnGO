import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/hooks/cartSlice";


export type Order = {
  id: string;
  userId: number;
  username: string;
  items: CartItem[];
  total: number;
  status: "pending" | "received";
  createdAt: string;
};

const initialState: Order[] = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload);
    },
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      return action.payload;
    },
    cancelOrder: (state, action: PayloadAction<string>) => {
      return state.filter((order) => order.id !== action.payload);
    },


    updateOrderStatus: (state, action: PayloadAction<{id: string; status: "pending" | "received"}>) => {
      const order = state.find(o => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
    },
  },
});

export const { placeOrder, updateOrderStatus , loadOrders , cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
