import { createSlice } from "@reduxjs/toolkit";

interface ICAccount {
  email: string;
  school: string;
  role: {
    isStudent: boolean;
    isAdvisor: boolean;
    isRecruiter: boolean;
  };
}

const initialState: ICAccount = {
  email: "",
  school: "",
  role: {
    isStudent: false,
    isAdvisor: false,
    isRecruiter: false,
  },
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRegisterEmail, setSchool, setRole } = accountSlice.actions;

export default accountSlice.reducer;
