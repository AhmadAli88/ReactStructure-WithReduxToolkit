/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./auth.service";
import { toast } from "react-toastify";

const initialState = {
  signIn: null,
  createAccount: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusMessage: "",
};

export const signInAction = createAsyncThunk(
  "auth/signInApi",
  async ({ finalData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await auth.signInApi(finalData);
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
      if (error.message === "Access Forbidden") {
        // notifyToaster("Your account is blocked. Please contact Administration.https://zealdrivensolutions.ai/", "error");
        toast.error(
          <div>
            <a href="https://zealdrivensolutions.ai/#contact">
              Your account is blocked. Please click here to contact
              Administration
            </a>
          </div>
          // {
          //   autoClose: false, // or set your desired time
          // }
        );
      } else if (error.message === "Unprocessable Entity Exception") {
        notifyToaster("Invalid email/password", "error");
      } else {
        notifyToaster(error.message, "error");
      }
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

export const createAccountAction = createAsyncThunk(
  "auth/createAccountApi",
  async ({ finalData, notifyToaster, moveToNext }, thunkAPI) => {
    try {
      const response = await auth.createAccountApi(finalData);
      if (response.succeeded === true) {
        if (notifyToaster) {
          notifyToaster("Account Successfully Created", "success");
        }

        if (moveToNext) {
          moveToNext(response.data);
        }
      } else {
        notifyToaster(response.message, "error");
      }
      return response.data;
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

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(signInAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(socialLoginsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signIn = action.payload;
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signIn = action.payload;
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })

      .addCase(createAccountAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccountAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createAccount = action.payload;
      })
      .addCase(createAccountAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })

      .addCase(forgetPasswordApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forgetPassword = action.payload;
      })
      .addCase(forgetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })

      .addCase(getLoggedInUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.userSubscriptionData = action.payload.data;
      })
      .addCase(getLoggedInUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })
      .addCase(verifyOtpApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtpApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.verifyOtp = action.payload.data;
      })
      .addCase(verifyOtpApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })
      .addCase(resendOtpApiAction.pending, (state) => {
        state.isLoadingResend = true;
      })
      .addCase(resendOtpApiAction.fulfilled, (state, action) => {
        state.isLoadingResend = false;
        state.isSuccess = true;
        state.otpExpiryTimeStr = action.payload;
      })
      .addCase(resendOtpApiAction.rejected, (state, action) => {
        state.isLoadingResend = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })
      .addCase(resetPasswordApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.resetPassword = action.payload.data;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      });
  },
});

export const { clearData } = authSlice.actions;

export default authSlice.reducer;
