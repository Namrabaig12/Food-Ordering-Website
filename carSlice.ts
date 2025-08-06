// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.qty += action.payload.qty;
      else state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      return state.filter(i => i.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;