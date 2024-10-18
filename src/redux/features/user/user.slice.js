/* eslint-disable */

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import user from "./users.service";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isGetAgreementLoading: false,
  statusMessage: "",
  getAllUserList: [],
};
export const getAllUserListApi = createAsyncThunk(
  "user/getAllUserList",
  async ({ finalData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await user.getAllUserList(finalData);
      if (response.succeeded === true) {
        if (notifyToaster) {
          notifyToaster(response.message, "success");
        }
        if (moveToNext) {
          moveToNext(response.data);
        }
      } else {
        notifyToaster(response.message, "error");
      }
      return response;
    } catch (error) {
      notifyToaster(error.message, "error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearData: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.statusMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserListApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserListApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getAllUserList = action.payload;
      })
      .addCase(getAllUserListApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      });
  },
});

export const { clearData, toggleUserActiveStatus } = userSlice.actions;

export default userSlice.reducer;
