
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";
import { productSlice } from "./CrudSlice";

export const store = configureStore({
  reducer: {
    // loged: loginSlice.reducer,
    Auth:AuthSlice.reducer,
    Crud:productSlice.reducer
  
   
  },

});
