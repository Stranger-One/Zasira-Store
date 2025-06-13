import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/addresses`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const saveAddress = createAsyncThunk(
  "user/saveAddress",
  async (
    {
      user,
      fullName,
      email,
      phoneNumber,
      country,
      street,
      apartment,
      city,
      state,
      postcode,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/add", {
        user,
        fullName,
        email,
        phoneNumber,
        country,
        street,
        apartment,
        city,
        state,
        postcode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth.userData.id
    try {
      const response = await api.get(`get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveAddress.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.address = action.payload.address;
      })
      .addCase(saveAddress.rejected, (state, action) => {
        toast.error(action.payload.message);
        console.error("Add address failed:", action.payload);
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
          state.address = action.payload.address;  
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        console.error("Fetch address failed:", action.payload);
      });
  },
});

export default addressSlice.reducer;
