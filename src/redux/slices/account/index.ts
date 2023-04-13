import { createSlice } from "@reduxjs/toolkit";

interface ICAccount {
  email: string;
  school: string;
}

const initialState: ICAccount = {
  email: "",
  school: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRegisterEmail: (state, action) => {
      state.email = action.payload;
    },
    setSchool: (state, action) => {
      state.school = action.payload;
    },
  },
});

export const { setRegisterEmail, setSchool } = accountSlice.actions;

export default accountSlice.reducer;
