import { createSlice } from "@reduxjs/toolkit";
import { UserSesion, userInfo } from "../../models/user.model";
import { clearLocalStorage, persistLocalStorage } from "../../utilities/localSotorage.utility";

export const userEmpty: UserSesion = {
  id:0,
  name:"",
  state:false,
  username:"",
  role:'',
  permissions:[]
}
const stateEmpty:userInfo={
  user:userEmpty,
  token:"",
}
const UserKey = 'user';
export const userSlice = createSlice({
    name:'user',
    initialState:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')as string):stateEmpty,
    reducers:{
        createUser: (state, action) => {
            state
            persistLocalStorage<userInfo>(UserKey, action.payload);
            return action.payload;
          },
          updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            persistLocalStorage<userInfo>(UserKey, result);
            return result;
          },
          resetUser: () => {
            clearLocalStorage(UserKey);
            return stateEmpty;
          }
    }
});
export const {createUser, updateUser, resetUser} = userSlice.actions;
export default userSlice.reducer;
