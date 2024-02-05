import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user.model";
import { Roles } from "../../models/roles";
import { clearLocalStorage, persistLocalStorage } from "../../utilities/localSotorage.utility";

export const initialStateEmpty: UserInfo = {
    id:0,
    name: '',
    username: '',
    token:'',
    rol: Roles.ANOMIMOUS,
    permissions:[]
}
const UserKey = 'user';
export const userSlice = createSlice({
    name:'user',
    initialState:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')as string):initialStateEmpty,
    reducers:{
        createUser: (state, action) => {
            persistLocalStorage<UserInfo>(UserKey, action.payload);
            return action.payload;
          },
          updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            persistLocalStorage<UserInfo>(UserKey, result);
            return result;
          },
          resetUser: () => {
            clearLocalStorage(UserKey);
            return initialStateEmpty;
          }
    }
});
export const {createUser, updateUser, resetUser} = userSlice.actions;
export default userSlice.reducer;
