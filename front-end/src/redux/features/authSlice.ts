import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";
import { isLoginService, logOutService } from "../../services/authService";

const initialState: AuthSlice = {
  loggedUser: null,
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
};

export const isLoggedIn = createAsyncThunk(
  '/auth/isLoggedIn',
  async () => {
    const response = await isLoginService();
    return response.data;
  }
);

export const logout = createAsyncThunk(
  '/auth/logout',
  async () => {
    const response = await logOutService();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, modalOpen: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(isLoggedIn.pending, (state) => {
        state.loggedUser = null
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.loggedUser = action.payload?.success ? action.payload.data : null
      })
      .addCase(isLoggedIn.rejected, (state) => {
        state.loggedUser = null
      })
      .addCase(logout.pending, (state) => {
        state.loggedUser = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedUser = null
      })
      .addCase(logout.rejected, (state) => {
        state.loggedUser = null
      })
  },
});

export const { updateModal } = authSlice.actions;
export default authSlice.reducer;
