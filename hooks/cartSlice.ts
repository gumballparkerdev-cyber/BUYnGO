import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types/index"

export type CartItem = Product & { quantity: number }

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      return action.payload
    },
    clearCart: (state) => {
      return [];
    },

    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      return state.filter(item => item.id !== action.payload.id)
    },
    increaseQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.find(i => i.id === action.payload.id)
      if (item) item.quantity += 1
    },
    decreaseQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.find(i => i.id === action.payload.id)
      if (item) {
        if (item.quantity === 1) {
          return state.filter(i => i.id !== action.payload.id)
        } else {
          item.quantity -= 1
        }
      }
    },
  },
})

export const { loadCart, addItem, removeItem, increaseQuantity, decreaseQuantity , clearCart  } =
  cartSlice.actions

export default cartSlice.reducer
