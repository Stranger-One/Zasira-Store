import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/cart`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    const { userData } = getState().auth;

    try {
      const response = await api.get(`/${userData.id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size }, { getState, rejectWithValue }) => {
    const { userData } = getState().auth;

    try {
      const response = await api.post("/add", {
        userId: userData.id,
        productId,
        quantity,
        size,
      });
      // console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, quantity }, { getState, rejectWithValue }) => {
    const { userData } = getState().auth;

    try {
      const response = await api.put(`/remove/${userData.id}`, {
        productId,
        size,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, size, quantity }, { getState, rejectWithValue }) => {
    const { userData } = getState().auth;

    try {
      const response = await api.put(`/update/${userData.id}`, {
        productId,
        size,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.log("Error updating quantity: ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const { userData } = getState().auth;

    try {
      const response = await api.delete(`/clear/${userData.id}`);
      return response.data;
    } catch (error) {
      console.log("Error clear cart: ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get cart cases
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload?.cart?.products || [];
        state.loading = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      })
      // Add to cart cases
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload?.cart?.products || [];
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      // Remove from cart cases
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload?.cart?.products || [];
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
      })
      // Update quantity cases
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cart = action.payload?.cart?.products || [];
        state.loading = false;
      })
      .addCase(updateQuantity.rejected, (state) => {
        state.loading = false;
      })
      // Clear cart cases
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload?.cart?.products || [];
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setItem, addToCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
