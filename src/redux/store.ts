import { configureStore } from "@reduxjs/toolkit";
import { userInfo } from "../models/user.model";
import { userSlice } from "./state/user";
import shopSlice from "./state/shop"
import { ProductDetail } from "../components/detailProduct/DetailProduct";

export interface AppStore {
    user: userInfo;
    shop:ProductDetail[]
  }
  
  export default configureStore<AppStore>({
    reducer: {
      user: userSlice.reducer,
      shop:shopSlice
    }
  });
  