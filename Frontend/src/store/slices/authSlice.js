
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/me");
    connectSocket(res.data);
    return res.data;
  } catch (error) {
    console.log("Error Fetching user:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data || "Failed to Fetch User",
    );
  }
});

export const logout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
  try {

    await axiosInstance.get("/user/sign-out");
    disconnectSocket();
    return null;
  } catch (error) {

    toast.error(error.response.data.message)
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});

export const login = createAsyncThunk("user/sign-in", async (data, thunkAPI) => {
  try {

    const res=await axiosInstance.post("/user/sign-in",data);
    connectSocket(res.data.user);
    toast.success("Logged In Successfully ")
    return res.data.user;
  } catch (error) {

    toast.error(error.response.data.message)
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      }).addCase(logout.fulfilled,(state)=>{
        state.authUser=null;
      }).addCase(logout.rejected,(state)=>{
        state.authUser=state.authUser;
      }).addCase(login.pending,(state)=>{
        state.isLoggingIn=true
      }).addCase(login.fulfilled,(state,action)=>{
        state.authUser= action.payload;
        state.isLoggingIn=false;
      }).addCase(login.rejected,(state)=>{
        state.isLoggingIn=false;
      })
  },
});

export const { setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;











// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../lib/axios";
// import { connectSocket, disconnectSocket } from "../../lib/socket";
// import { toast } from "react-toastify";

// export const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
//   try {
//     const res = await axiosInstance.get("/user/me");
//     connectSocket(res.data.user);
//     return res.data.user;
//   } catch (error) {
//     console.log("Error Fetching user:", error);
//     return thunkAPI.rejectWithValue(
//       error.response?.data || "Failed to Fetch User"
//     );
//   }
// });

// export const logout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
//   try {
//     await axiosInstance.get("/user/sign-out");
//     disconnectSocket();
//     toast.success("Logged out successfully");
//     return null;
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Logout failed");
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Logout failed"
//     );
//   }
// });

// export const login = createAsyncThunk("user/sign-in", async (data, thunkAPI) => {
//   try {
//     const res = await axiosInstance.post("/user/sign-in", data);
//     connectSocket(res.data);
//     toast.success("Logged In Successfully");
//     return res.data;
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Login failed");
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Login failed"
//     );
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     authUser: null,
//     isLoggingIn: false,
//     isCheckingAuth: true,
//     onlineUsers: [],
//   },
//   reducers: {
//     setOnlineUsers(state, action) {
//       state.onlineUsers = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // getUser
//       .addCase(getUser.fulfilled, (state, action) => {
//         state.authUser = action.payload;
//         state.isCheckingAuth = false;
//       })
//       .addCase(getUser.rejected, (state) => {
//         state.authUser = null;
//         state.isCheckingAuth = false;
//       })

//       // login
//       .addCase(login.pending, (state) => {
//         state.isLoggingIn = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.authUser = action.payload;
//         state.isLoggingIn = false;
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoggingIn = false;
//       })

//       // logout
//       .addCase(logout.fulfilled, (state) => {
//         state.authUser = null;
//       });
//   },
// });

// export const { setOnlineUsers } = authSlice.actions;
// export default authSlice.reducer;









