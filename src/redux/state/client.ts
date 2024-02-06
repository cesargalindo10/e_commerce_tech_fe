import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id:number;
  name: string;
}
export const initialStateEmpty: Category = {
  id:0,
  name: "",
};

export const clientSlice = createSlice({
  name: 'client',
  initialState:initialStateEmpty,
  reducers: {
    createClient: (state, action) => {
      return action.payload;
    },
    updateClient: (state, action) => {
      const result = { ...state, ...action.payload };
      return result;
    },
    resetClient: () => {
      return initialStateEmpty;
    },
  },
});
export const { createClient, updateClient, resetClient } = clientSlice.actions;
export default clientSlice.reducer;
