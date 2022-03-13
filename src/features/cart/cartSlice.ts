import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Coupon, Menu, Order } from "../../types";

interface CartState {
  totalCount: number;
  orders: Order[];
  totalPrice: number;
}

const initialState: CartState = {
  totalCount: 0,
  orders: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Menu>) => {
      state.totalCount += 1;
      state.totalPrice += action.payload.price;

      const idx = state.orders.findIndex(
        order => order.id === action.payload.id
      );

      if (idx === -1) {
        state.orders.push({
          ...action.payload,
          count: 1,
          discount: [],
        });
      } else {
        state.orders[idx].count += 1;
      }
    },
    increment: (state, action: PayloadAction<string>) => {
      const idx = state.orders.findIndex(order => order.id === action.payload);

      if (idx > -1) {
        state.totalCount += 1;
        state.orders[idx].count += 1;
        state.totalPrice += state.orders[idx].price;
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const idx = state.orders.findIndex(order => order.id === action.payload);

      if (idx > -1) {
        state.totalCount -= 1;
        state.orders[idx].count -= 1;
        state.totalPrice -= state.orders[idx].price;

        if (state.orders[idx].count === 0) {
          state.orders.splice(idx, 1);
        }
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const idx = state.orders.findIndex(order => order.id === action.payload);

      if (idx > -1) {
        state.totalCount -= state.orders[idx].count;
        state.totalPrice -= state.orders[idx].price * state.orders[idx].count;
        state.orders.splice(idx, 1);
      }
    },
    discount: (
      state,
      action: PayloadAction<{ id: string; checked: boolean; coupon: Coupon }>
    ) => {
      const { id, checked, coupon } = action.payload;
      const idx = state.orders.findIndex(order => order.id === id);

      if (idx > -1) {
        const orderItem = state.orders[idx];
        const discountAmount =
          orderItem.price * orderItem.count * (coupon.discount_rate / 100);

        if (checked) {
          orderItem.discount.push(coupon);
          state.totalPrice -= discountAmount;
        } else {
          const couponIndex = state.orders[idx].discount.findIndex(
            c => c.id === coupon.id
          );
          orderItem.discount.splice(couponIndex, 1);
          state.totalPrice += discountAmount;
        }
      }
    },
  },
});

export const { add, increment, decrement, remove, discount } =
  cartSlice.actions;

export const selectOrders = (state: RootState) => state.cart.orders;
export const selectCount = (state: RootState) => state.cart.totalCount;
export const selectPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
