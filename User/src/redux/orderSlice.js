import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/orders`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const makeOrder = createAsyncThunk(
  "order/makeOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await api.post("/addOrder", order);
      return response.data;
    } catch (error) {
      console.log("Failed to make order: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to add order!" }
      );
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth.userData.id;
    try {
      const response = await api.get(`/get-orders/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Failed to fetch orders: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to get orders!" }
      );
    }
  }
);

export const calcelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { getState, rejectWithValue }) => {
    const userId = getState().auth.userData.id;

    try {
      const response = await api.put(`/update/${orderId}`, {
        orderStatus: "Cancelled",
        userId
      });
      return response.data;
    } catch (error) {
      console.log("Failed to cancel order: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to cancel order!" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(getOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(calcelOrder.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        toast.success("Order canceled successfully");
      })
      .addCase(calcelOrder.rejected, (state, action) => {
        toast.error("Failed to cancel order");
      })
  },
});

export default orderSlice.reducer;
