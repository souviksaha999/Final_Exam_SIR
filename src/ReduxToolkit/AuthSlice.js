import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const initialState = {
  //   upload_status: "idle",
  //   // upload_message: "idle",
  //   status:"idle",
  //   login_status:"idle",
  //   des: [],o
  isloggedIn: false,
  redirectTo: null,
  SetToken: "",
  redirectToo: null
};

export const register = createAsyncThunk("/user/signup", async (formData) => {
  let res = await axiosInstance.post(`/user/signup`, formData);
  let resData = res?.data;
  return resData;
}
);

export const pro = createAsyncThunk("/user/profile-details", async () => {
  let res = await axiosInstance.get(`/user/profile-details`,);
  let resData = res?.data;
  return resData;
}
);


export const login = createAsyncThunk("/user/signin", async (formData) => {
  let res = await axiosInstance.post(`/user/signin/`, formData);
  let resData = res?.data;
  return resData;
}
);


export const AuthSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset_redirectTo: (state, { payload }) => {
      state.redirectTo = payload;
    },

    reset_redirectToo: (state, { payload }) => {
      state.redirectToo = payload;
    },
    check_token: (state, { payload }) => {
      let token = localStorage.getItem("token");
      if (token !== null && token !== undefined) {
        state.isloggedIn = true;
      }
    },
    handleLoggedout: (state, { payload }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("Name");
      localStorage.removeItem("proimg");
      state.isloggedIn = false;
    },

    handleRegister: (state, { payload }) => {

      localStorage.removeItem("name");

    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload?.status === 200) {
          state.isloggedIn = true
          localStorage.setItem("name", payload?.data?.first_name);
          state.redirectToo = "/login"
          toast(payload?.message)
          // toast.success(payload?.message, {
          //   type: "success",
          //   hideProgressBar: true,
          //   autoClose: 2500,
          // });
        } else {
          if (payload?.status == 201) {
            toast(payload?.message)
          }
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(login.pending, (state, action) => {
        state.login_status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload?.status == 200) {
          state.login_status = "idle";
          state.redirectTo = "/"
          state.isloggedIn = true
          localStorage.setItem("token", payload?.token);
          localStorage.setItem("Name", payload?.data?.first_name); 
          localStorage.setItem("proimg", payload?.data?.profile_pic)
          toast(payload?.message)
        } else {
          if (payload?.status == 201) {
            toast(payload?.message)
          }
        }
        // else{
        //   console.log("kjjhj",state.login_status);
        //   state.login_status = "idle";
        // }


        // localStorage.setItem("Name",payload?.user.name);



      })
      .addCase(login.rejected, (state, { payload }) => {
        // if(payload?.status==201){
        //   toast(payload?.message)
        //  }

      })


      .addCase(pro.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(pro.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.profile = payload?.data

      })
      .addCase(pro.rejected, (state, action) => {
        state.status = "idle";
      })
  },
});

export const { reset_redirectTo, check_token, handleLoggedout, reset_redirectToo, handleRegister } = AuthSlice.actions;
