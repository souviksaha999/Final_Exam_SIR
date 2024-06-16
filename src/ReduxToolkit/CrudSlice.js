import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
// import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "react-toastify";
const initialState = {
  //   upload_status: "idle",
  //   // upload_message: "idle",
  //   status:"idle",
  //   login_status:"idle",
  //   des: [],
  list: [{}],
  totalpage: "",
  det: [{}],
  redirect: null,
  redirectUpdate: null
};




export const productlist = createAsyncThunk("product/list",async (formdata) => { 
    let res = await axiosInstance.post(`/product/list`, formdata);
    let resData = res?.data;
    return resData;
  }
);


export const productDetails = createAsyncThunk("product/detail/",async (id) => {
    let res = await axiosInstance.get(`product/detail/${id}`);
    let resData = res?.data;
    return resData;
  }
);



export const productRemove = createAsyncThunk("/product/remove", async (formdata) => {
    let res = await axiosInstance.post(`/product/remove`, formdata);
    let resData = res?.data;
    return resData;
  }
);




export const productUpdate = createAsyncThunk("/product/update", async (formdata) => {
    let res = await axiosInstance.post(`/product/update`, formdata);
    let resData = res?.data;
    return resData;
  }
);




export const ProjectCre = createAsyncThunk("/product/create", async (formdata) => {
    let res = await axiosInstance.post(`/product/create`, formdata);
    let resData = res?.data;
    return resData;
  }
);



export const productSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset_redirectToUpdate: (state, { payload }) => {
      state.redirect = payload;

    },
    createlog: (state, { payload }) => {
      localStorage.removeItem("title");

    },

    updatelog: (state, { payload }) => {
      localStorage.removeItem("title");

    },


    reset_redirectTo: (state, { payload }) => {
      state.redirectUpdate = payload;

    },

  },

  extraReducers: (builder) => {
    builder
    
      .addCase(productlist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productlist.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.list = payload?.data;
        state.totalpage = payload?.totalPages;

      })
      .addCase(productlist.rejected, (state, action) => {
        state.status = "idle";
      })


    

      .addCase(productDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productDetails.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.det = payload?.data


      })
      .addCase(productDetails.rejected, (state, action) => {
        state.status = "idle";
      })



      .addCase(productRemove.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productRemove.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.total = payload?.data
        toast(payload?.message)
      })
      .addCase(productRemove.rejected, (state, action) => {
        state.status = "idle";
      })



      .addCase(productUpdate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productUpdate.fulfilled, (state, { payload }) => {
        state.status = "idle";
        localStorage.setItem("title",payload?.data?.title)
        state.redirectUpdate = "/productlist"
        toast(payload?.message)
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.status = "idle";
      })



      .addCase(ProjectCre.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(ProjectCre.fulfilled, (state, { payload }) => {
        state.status = "idle";
        localStorage.setItem("title", payload?.data.title)
        state.redirect = "/productlist"
        toast(payload?.message)
      })
      .addCase(ProjectCre.rejected, (state, action) => {
        state.status = "idle";
      })
  },
});

export const { reset_redirectToUpdate, createlog,reset_redirectTo,updatelog} = productSlice.actions;
