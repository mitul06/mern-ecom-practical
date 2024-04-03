import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBrandSlice } from "../../models/BrandSlice";
import { getAllBrands } from "../../services/productService";


const initialState: IBrandSlice = {
  allBrands: [],
  isLoading: false,
  isNext: false
};

export const allBrands = createAsyncThunk(
  'brand/all',
  async (params: any) => {
    const response = await getAllBrands(params);
    return response.data;
  }
);

export const brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allBrands.pending, (state) => {
        state.isLoading = true
        state.allBrands = []
      })
      .addCase(allBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.allBrands = action.payload.data
        state.isNext = action.payload.isNext
      })
      .addCase(allBrands.rejected, (state) => {
        state.isLoading = false
        state.allBrands = []
      })
  },
});

export default brandSlice.reducer;
