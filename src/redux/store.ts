import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import { userSlice } from "./state/user";
import { clientSlice } from "./state/client";
interface Category {
  id:number;
  name: string;
}
export interface AppStore {
    user: UserInfo;
    client:Category
  }
  
  export default configureStore<AppStore>({
    reducer: {
      user: userSlice.reducer,
      client:clientSlice.reducer
    }
  });
  