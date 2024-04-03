import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategorySlice } from "../../models/CategorySlice";
import { getAllCategories } from "../../services/productService";


const initialState: ICategorySlice = {
  allCategories: [],
  isLoading: false,
  isNext: false
};

export const allCategories = createAsyncThunk(
  'category/all',
  async (params: any) => {
    const response = await getAllCategories(params);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allCategories.pending, (state) => {
        state.isLoading = true
        state.allCategories = []
      })
      .addCase(allCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.allCategories = action.payload.data
        state.isNext = action.payload.isNext
      })
      .addCase(allCategories.rejected, (state) => {
        state.isLoading = false
        state.allCategories = []
      })
  },
});

export default categorySlice.reducer;
