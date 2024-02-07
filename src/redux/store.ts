import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import { userSlice } from "./state/user";
import shopSlice from "./state/shop"
import { ProductDetail } from "../components/detailProduct/DetailProduct";

export interface AppStore {
    user: UserInfo;
    shop:ProductDetail[]
  }
  
  export default configureStore<AppStore>({
    reducer: {
      user: userSlice.reducer,
      shop:shopSlice
    }
  });
  