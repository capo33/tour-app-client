import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Actions
// 1. Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.login(formData);
      console.log("data: ", data);
      toast.success(`Welcome back ${data?.result?.name}`);
      navigate("/");
      return data;
    } catch (err) {
      // toast.error(err.response.data?.message);
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. Register
export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.register(formData);
      toast.success(`Welcome ${data?.result?.name}`);
      navigate("/");
      return data;
    } catch (err) {
      toast.error(err.response.data?.message);
      return rejectWithValue(err.response.data);
    }
  }
);

// 3. Google Login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.googleLogin({ result });
      toast.success("Google Login Successfull");
      navigate("/");
      return data;
    } catch (err) {
      toast.error(err.response.data?.message);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // Register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // Google Login
    builder.addCase(googleLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      console.log("action.payload: ", action.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
