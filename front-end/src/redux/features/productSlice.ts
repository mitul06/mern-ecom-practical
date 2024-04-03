import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import { ProductSlice } from "../../models/ProductSlice";
import { getAllProducts, getProduct } from "../../services/productService";

const initialState: ProductSlice = {
  allProducts: [],
  categories: [],
  newProducts: [],
  featuredProducts: [],
  wishlist: [],
  viewProduct: null,
  isLoading: false,
  isNext: false
};

export const getProductById = createAsyncThunk(
  'product/get',
  async (id: string) => {
    const response = await getProduct(id);
    return response.data;
  }
);

export const allProducts = createAsyncThunk(
  'product/all',
  async (params: any) => {
    const response = await getAllProducts(params);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateNewList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, newProducts: action.payload };
    },
    updateFeaturedList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const { wishlist } = state;
      if (wishlist.findIndex((item) => item._id === action.payload._id) === -1) {
        const updatedList = [...state.wishlist, action.payload];
        return { ...state, wishlist: updatedList };
      }
    },
    removeToWishlist: (state, action: PayloadAction<Product>) => {
      const { wishlist } = state;
      if (wishlist.findIndex((item) => item._id !== action.payload._id) === -1) {

        const updatedList = wishlist.filter((item) => item._id !== action.payload._id);

        return { ...state, wishlist: updatedList };
      }
    },
    addCategories: (state, action: PayloadAction<string[]>) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.viewProduct = action.payload.data
      })
      .addCase(getProductById.rejected, (state) => {
        state.isLoading = false
        state.viewProduct = null
      })
      .addCase(allProducts.pending, (state) => {
        state.isLoading = true
        state.allProducts = []
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.allProducts = action.payload.data
        state.isNext = action.payload.isNext
      })
      .addCase(allProducts.rejected, (state) => {
        state.isLoading = false
        state.allProducts = []
      })
  },
});

export const {
  updateNewList,
  updateFeaturedList,
  addToWishlist,
  addCategories,
  addProducts,
  removeToWishlist
} = productSlice.actions;
export default productSlice.reducer;
